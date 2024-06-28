import { useEffect } from 'react'
import ruRu from 'antd/locale/ru_RU'
import { App as AntWrapper, ConfigProvider } from 'antd'

import Modals from '@/components/Modals'
import Main from '@/components/layouts/Main'
import Header from '@/components/layouts/header/Header'
import Footer from '@/components/layouts/footer/Footer'

import { AuthProvider } from '@/context/auth'
import { categoryApi } from './services/category'
import { useAppDispatch } from '@/hooks/app-hooks'
import { themeConfiguration } from '@/config/theme'
import { setCategories } from '@/store/global/store'

export default function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        categoryApi.getCategories().then((res) => {
            if (res.status >= 200 && res.status <= 300) {
                dispatch(setCategories(res.data))
            }
        })
    }, [])

    return (
        <ConfigProvider theme={themeConfiguration} locale={ruRu}>
            <AntWrapper message={{ maxCount: 1, duration: 1.5 }}>
                <AuthProvider>
                    <Header />
                    <Main />
                    <Footer />
                    <Modals />
                </AuthProvider>
            </AntWrapper>
        </ConfigProvider>
    )
}
