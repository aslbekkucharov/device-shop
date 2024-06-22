import { clsx } from 'clsx'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { LoginOutlined } from '@ant-design/icons'
import classes from '@/components/layouts/header/header.module.scss'

export default function Header() {
    return (
        <header className={classes.header}>
            <div className={clsx('container', classes.header__row)}>
                <Link to="/" className='logo'>Device shop</Link>
                <Button size="large" iconPosition='end' icon={<LoginOutlined />}>Войти</Button>
            </div>
        </header>
    )
}