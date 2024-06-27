import { clsx } from 'clsx'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginOutlined, PlusCircleOutlined } from '@ant-design/icons'

import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch } from '@/hooks/app-hooks'
import { setProductModalVisibility } from '@/store/global/store'
import classes from '@/components/layouts/header/header.module.scss'

export default function Header() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isAuthenticated } = useAuth()

    function handleLogin() {
        navigate('/login')
    }

    function handleAddProduct() {
        dispatch(setProductModalVisibility(true))
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