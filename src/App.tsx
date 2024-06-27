import ruRu from 'antd/locale/ru_RU'
import { ConfigProvider } from "antd"
import { Provider } from 'react-redux'

import Modals from "@/components/Modals"
import Main from "@/components/layouts/Main"
import Header from "@/components/layouts/header/Header"
import Footer from "@/components/layouts/footer/Footer"

import { store } from '@/store'
import { AuthProvider } from "@/context/auth"
import { themeConfiguration } from "@/config/theme"

export default function App() {
  return (
    <ConfigProvider theme={themeConfiguration} locale={ruRu}>
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <Main />
          <Footer />
          <Modals />
        </AuthProvider>
      </Provider>
    </ConfigProvider>
  )
}