import { Button } from 'antd'
import { useState } from 'react'
import { setIn } from 'final-form'
import { ValidationError } from 'yup'
import { Navigate } from 'react-router-dom'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Form, FormRenderProps } from 'react-final-form'

import { useAuth } from '@/hooks/useAuth'
import type { LoginPayload } from '@/types'
import { loginSchema } from '@/validations'
import { authorizedUser } from '@/config/user'
import classes from '@/views/login/login.module.scss'
import LoginForm from '@/components/form/login/LoginForm'

export default function Login() {
    const { login, isAuthenticated } = useAuth()
    const [initialValues, setInitialValues] = useState<LoginPayload>()

    function handleLoginFormSubmit(payload: LoginPayload) {
        if (authorizedUser.username === payload.username && authorizedUser.password === payload.password) {
            login()
            localStorage.setItem('isLogged', 'true') // for some reason "token" name is crashing json-server
        }
    }

    function handleFormValidate(values: LoginPayload) {
        try {
            loginSchema.validateSync(values, { abortEarly: false })
        } catch (err) {
            if (err instanceof ValidationError) {
                return err.inner.reduce((errors, error) => {
                    return setIn(errors, error.path!, error.message)
                }, {} as object)
            }

            return {}
        }
    }

    function handleAutoFill() {
        setInitialValues(() => ({
            username: authorizedUser.username,
            password: authorizedUser.password
        }))
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <div className={classes['login-page']}>
            <div className={classes['login-form']}>
                <div className={classes['login-form__head']}>
                    <h2 className={classes['login-form__title']}>Вход в кабинет</h2>

                    <p className={classes['login-form__subtitle']}>Войдите в свою учетную запись чтобы редактировать или добавлять товары.</p>
                </div>

                <Form initialValues={initialValues} validate={handleFormValidate} onSubmit={handleLoginFormSubmit} render={(props: FormRenderProps<LoginPayload>) => <LoginForm {...props} />} />

                <div className={classes['login-form__footer']}>
                    <Button onClick={handleAutoFill} type="text" size="small" icon={<CheckCircleOutlined />} iconPosition="end">
                        Заполнить автоматически
                    </Button>
                </div>
            </div>
        </div>
    )
}
