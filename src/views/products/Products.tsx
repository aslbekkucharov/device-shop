import { Link } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { SyntheticEvent, useEffect, useMemo, useState } from 'react'
import { Button, Card, Empty, Input, Pagination, Select, Space } from 'antd'

import { debounce } from '@/utils'
import type { Product } from '@/types/product'
import { productsApi } from '@/services/products'
import { categoryApi } from '@/services/category'
import classes from '@/views/products/products.module.scss'
import ProductCard from '@/components/product-card/ProductCard'
import { setCategories, setEditingProduct, setIsProductEditing, setProductModalVisibility, setProducts } from '@/store/global/store'
import { useAppDispatch, useAppSelector } from '@/hooks/app-hooks'
import { PageableResponse, Pagination as PaginationType } from '@/types'

interface Filter {
    category: string
    searchKey: string
}

function ProductsContent(props: { products: Product[] }) {

    const dispatch = useAppDispatch()

    const publishedProducts = props.products.filter(p => p.status === 'published')

    function handleProductEdit(event: SyntheticEvent, product: Product) {
        event.preventDefault()
        dispatch(setIsProductEditing(true))
        dispatch(setEditingProduct(product))
        dispatch(setProductModalVisibility(true))
    }

    async function handleProductDelete(event: SyntheticEvent, id: string) {
        event.preventDefault()
        await productsApi.deleteProduct(id)
        productsApi.getProducts<PageableResponse<Product>>({ _page: 1, _per_page: 6 }).then((res) => {
            dispatch(setProducts(res.data.data))
        })
    }

    if (props.products?.length) {
        return (
            <div className="products-list">
                {publishedProducts.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <ProductCard data={product}>
                            <>
                                <Button onClick={(e) => handleProductDelete(e, product.id)} block>
                                    Удалить
                                </Button>
                                <Button type='primary' onClick={(e) => handleProductEdit(e, product)} block>
                                    Редактировать
                                </Button>
                            </>
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