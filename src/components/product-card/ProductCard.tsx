import { formatPrice } from '@/utils'
import { Product } from '@/types/product'
import classes from '@/components/product-card/product-card.module.scss'

interface Props {
    data: Product
}

export default function ProductCard(props: Props) {
    return (
        <span className={classes['product-card']}>
            <span className={classes['product-card__head']}>
                <span className={classes['product-card__title']}>{props.data.name}</span>
                <span className={classes['product-card__price']}>{formatPrice(props.data.price)}</span>
            </span>
            <span className={classes['product-card__excerpt']}>{props.data.description}</span>
        </span>
    )
}
