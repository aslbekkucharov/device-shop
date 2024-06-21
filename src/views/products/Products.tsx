import { AxiosResponse } from 'axios'
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { Input, Pagination, Select, Space } from 'antd'

import { api } from '@/api'
import { Product } from '@/types/product'
import { Category } from '@/types/category'
import classes from '@/views/products/products.module.scss'
import ProductCard from '@/components/product-card/ProductCard'
import { PageableResponse, Pagination as PaginationType } from '@/types'

export default function Products() {

    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [categoryFilter, setCategoryFilter] = useState<string>('')
    const [pagination, setPagination] = useState<PaginationType>({ perPage: 6, total: 0, current: 1 })

    function handlePageChange(payload: number) {
        setPagination((prevVal) => ({ ...prevVal, current: payload }))
    }

    function handleCategorySelect(payload: string) {
        setCategoryFilter(() => payload)
    }

    const params = useMemo(() => {
        const result: Record<string, string | number | undefined> = {
            _page: pagination.current,
            _per_page: pagination.perPage,
        }

        if (categoryFilter) {
            result.category = categoryFilter
        }

        return result

    }, [pagination, categoryFilter])

    useEffect(() => {
        api.get('/products', { params }).then((res: AxiosResponse<PageableResponse<Product>>) => {
            setProducts(res.data.data)
            setPagination((prevVal) => ({ ...prevVal, total: res.data.items }))
        })
    }, [params])

    useEffect(() => {
        api.get('/categories').then((res: AxiosResponse<Category[]>) => {
            setCategories(res.data)
        })
    }, [])

    return (
        <div className={classes.products}>
            <div className={classes.products__head}>
                <h3 className={classes.products__title}>Products</h3>

                <Space>
                    <Input
                        size='large'
                        placeholder='Искать товар'
                        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
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

            <div className="products-list">
                {products.map(product => <ProductCard data={product} key={product.id} />)}
            </div>

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