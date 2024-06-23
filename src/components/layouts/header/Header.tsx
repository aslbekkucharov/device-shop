import { clsx } from 'clsx'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginOutlined, PlusCircleOutlined } from '@ant-design/icons'
import classes from '@/components/layouts/header/header.module.scss'
import { useAuth } from '@/hooks/useAuth'

export default function Header() {

    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    function handleLogin() {
        navigate('/login')
    }

    return (
        <header className={classes.header}>
            <div className={clsx('container', classes.header__row)}>
                <Link to="/" className='logo'>Device shop</Link>
                {isAuthenticated ? <Button onClick={handleLogin} size="large" iconPosition='end' icon={<PlusCircleOutlined />}>Добавить товар</Button> : <Button onClick={handleLogin} size="large" iconPosition='end' icon={<LoginOutlined />}>Войти</Button>}
            </div>
        </header>
    )
}