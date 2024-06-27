import { Link } from 'react-router-dom'
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Dropdown, Empty, Input, MenuProps, Pagination, Select, Space } from 'antd'

import { debounce } from '@/utils'
import { Product } from '@/types/product'
import { productsApi } from '@/services/products'
import { categoryApi } from '@/services/category'
import classes from '@/views/products/products.module.scss'
import ProductCard from '@/components/product-card/ProductCard'
import { setCategories, setProducts } from '@/store/global/store'
import { useAppDispatch, useAppSelector } from '@/hooks/app-hooks'
import { PageableResponse, Pagination as PaginationType } from '@/types'

interface Filter {
    category: string
    searchKey: string
}

function ProductsContent(props: { products: Product[] }) {

    const publishedProducts = props.products.filter(p => p.status === 'published')

    const menus: MenuProps['items'] = [
        {
            key: 2,
            label: 'Редактировать'
        },
        {
            key: 1,
            danger: true,
            label: 'Удалить'
        }
    ]

    const menuConfig: MenuProps = {
        items: menus
    }

    if (props.products && props.products.length) {
        return (
            <div className="products-list">
                {publishedProducts.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <ProductCard data={product}>
                            <Dropdown menu={menuConfig} trigger={['click']}>
                                <Button onClick={(e) => e.preventDefault()}>
                                    <EllipsisOutlined style={{ fontSize: 24 }} />
                                </Button>
                            </Dropdown>
                        </ProductCard>
                    </Link>
                ))}
            </div>
        )
    }

    return (
        <Card>
            <Empty />
        </Card>
    )
}

export default function Products() {

    const dispatch = useAppDispatch()
    const products = useAppSelector((state) => state.global.products)
    const categories = useAppSelector((state) => state.global.categories)
    const [filter, setFilter] = useState<Filter>({ searchKey: '', category: '' })
    const [pagination, setPagination] = useState<PaginationType>({ perPage: 6, total: 0, current: 1 })

    const debouncedSearchInputChangeHandler = debounce(setFilter, 500)

    function handlePageChange(payload: number) {
        setPagination((prevVal) => ({ ...prevVal, current: payload }))
    }

    function handleCategorySelect(payload: string) {
        setFilter((prevVal) => ({ ...prevVal, category: payload }))
    }

    function handleSearchInputChange(payload: string) {
        debouncedSearchInputChangeHandler((prevVal) => ({ ...prevVal, searchKey: payload }))
    }

    const params = useMemo(() => {
        const result: Record<string, string | number | undefined> = {
            _page: pagination.current,
            _per_page: pagination.perPage,
        }

        if (filter.category) {
            result.category = filter.category
        }

        if (filter.searchKey) {
            result.name = filter.searchKey
        }

        return result

    }, [filter])

    // Todo need to refactor
    useEffect(() => {
        categoryApi.getCategories().then(res => {
            dispatch(setCategories(res.data))
        })
    }, [])

    useEffect(() => {
        productsApi.getProducts<PageableResponse<Product>>(params).then((res) => {
            dispatch(setProducts(res.data.data))
            setPagination((prevVal) => ({ ...prevVal, total: res.data.items }))
        })
    }, [params])

    return (
        <div className={classes.products}>
            <div className={classes.products__head}>
                <h3 className={classes.products__title}>Товары</h3>

                <Space>
                    <Input
                        size='large'
                        placeholder='Искать товар'
                        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(event) => handleSearchInputChange(event.target.value)}
                    />

                    <Select
                        size='large'
                        options={categories}
                        onChange={handleCategorySelect}
                        placeholder="Выберите категорию"
                        notFoundContent="Ничего не найдено"
                        className={classes.products__select}
                    />
                </Space>
            </div>

            <ProductsContent products={products} />

            <div className={classes.products__pagination}>
                <Pagination
                    hideOnSinglePage={true}
                    total={pagination.total}
                    onChange={handlePageChange}
                    current={pagination.current}
                    pageSize={pagination.perPage}
                />
            </div>

        </div>
    )
}