import { Card, Empty } from 'antd'
import { AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

import { $api } from '@/api'
import { formatDate, formatPrice } from '@/utils'
import classes from '@/views/product/product.module.scss'
import type { Product as ProductType } from '@/types/product'

export default function Product() {
    const { id } = useParams<{ id: string }>()

    const [product, setProduct] = useState<ProductType>()

    const status = useMemo(() => {
        if (product) {
            const statuses = {
                published: 'Опубликован',
                hidden: 'Скрыт'
            }

            return statuses[product.status]
        }

        return 'Неизвестен'
    }, [product])

    useEffect(() => {
        $api.get(`/products/${id}`).then((response: AxiosResponse<ProductType>) => {
            setProduct(() => response.data)
        })
    }, [id])

    return product ? (
        <div className={classes['product-page']}>
            {product.image ? (
                <div className={classes['product-page__img']}>
                    <img src={product.image} />
                </div>
            ) : null}

            <h2 className={classes['product-page__title']}>{product.name}</h2>

            <div className={classes['product-page-info']}>
                <span className={classes['product-page-info__label']}>Дата релиза: </span>

                <p className={classes['product-page__description']}>{formatDate(product.releaseDate)}</p>
            </div>

            <div className={classes['product-page-info']}>
                <span className={classes['product-page-info__label']}>Дата создания: </span>

                <p className={classes['product-page__description']}>{formatDate(product.createdAt)}</p>
            </div>

            <div className={classes['product-page-info']}>
                <span className={classes['product-page-info__label']}>Цена товара: </span>

                <p className={classes['product-page__description']}>{formatPrice(product.price)}</p>
            </div>

            <div className={classes['product-page-info']}>
                <span className={classes['product-page-info__label']}>Статус товара: </span>

                <p className={classes['product-page__description']}>{status}</p>
            </div>

            <div className={classes['product-page-info']}>
                <span className={classes['product-page-info__label']}>Описание товара: </span>

                <p className={classes['product-page__description']}>{product.description}</p>
            </div>
        </div>
    ) : (
        <Card>
            <Empty />
        </Card>
    )
}
