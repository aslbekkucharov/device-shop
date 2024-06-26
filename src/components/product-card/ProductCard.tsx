import { Image } from 'antd'
import { formatPrice } from '@/utils'
import type { ReactNode } from 'react'
import { Product } from '@/types/product'
import classes from '@/components/product-card/product-card.module.scss'

interface Props {
    data: Product
    children?: ReactNode
}

export default function ProductCard(props: Props) {
    return (
        <span className={classes['product-card']}>
            <span className={classes['product-card__head']}>
                <span className={classes['product-card__head-col']}>
                    <span className={classes['product-card__title']}>{props.data.name}</span>

                    <span className={classes['product-card__price']}>{formatPrice(props.data.price)}</span>
                </span>

                <Image width={130} preview={false} src={props.data.image} className={classes['product-card__img']} />
            </span>

            <span className={classes['product-card__content']}>
                <span className={classes['product-card__excerpt']}>{props.data.description}</span>
            </span>

            <span className={classes['product-card__footer']}>{props.children}</span>
        </span>
    )
}
