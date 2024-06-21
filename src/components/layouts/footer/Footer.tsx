import classes from '@/components/layouts/footer/footer.module.scss'

export default function Footer() {
    return (
        <footer className={classes.footer}>
            <div className="container">
                <span className={classes.footer__text}>© Aslbek Kucharov. All rights reserved!</span>
            </div>
        </footer>
    )
}
