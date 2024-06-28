import { Link } from 'react-router-dom'
import notFoundIllustration from '@/assets/images/3.svg'
import classes from '@/pages/not-found/not-found.module.scss'

export default function NotFound() {
    return (
        <div className={classes['not-found-page']}>
            <div className={classes['not-found-page__img']}>
                <img src={notFoundIllustration} alt="" />
            </div>
            <div className={classes['not-found-page__content']}>
                <h2 className={classes['not-found-page__title']}>
                    Страница не найдена...
                </h2>
                <p className={classes['not-found-page__subtitle']}>
                    К сожалению страмы не нашли страницу которую вы хотели
                    увидеть, вы можете вернуться
                    <Link to="/"> на главную страницу</Link>
                </p>
            </div>
        </div>
    )
}
