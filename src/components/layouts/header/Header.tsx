import { clsx } from 'clsx'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginOutlined } from '@ant-design/icons'
import classes from '@/components/layouts/header/header.module.scss'

export default function Header() {

    const navigate = useNavigate()

    function handleLogin() {
        navigate('/login')   
    }

    return (
        <header className={classes.header}>
            <div className={clsx('container', classes.header__row)}>
                <Link to="/" className='logo'>Device shop</Link>
                <Button onClick={handleLogin} size="large" iconPosition='end' icon={<LoginOutlined />}>Войти</Button>
            </div>
        </header>
    )
}