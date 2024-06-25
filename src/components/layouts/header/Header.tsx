import { clsx } from 'clsx'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginOutlined, PlusCircleOutlined } from '@ant-design/icons'
import classes from '@/components/layouts/header/header.module.scss'
import { useAuth } from '@/hooks/useAuth'
import { useGlobal } from '@/hooks/useGlobal'

export default function Header() {

    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const { setIsProductAddModalVisible } = useGlobal()

    function handleLogin() {
        navigate('/login')
    }

    function handleAddProduct() {
        setIsProductAddModalVisible(() => true)
    }

    return (
        <header className={classes.header}>
            <div className={clsx('container', classes.header__row)}>
                <Link to="/" className='logo'>Device shop</Link>
                {
                    !isAuthenticated
                        ?
                        <Button onClick={handleLogin} size="large" iconPosition='end' icon={<LoginOutlined />}>Войти</Button>
                        :
                        <Button onClick={handleAddProduct} size="large" iconPosition='end' icon={<PlusCircleOutlined />}>Добавить товар</Button>
                }
            </div>
        </header >
    )
}