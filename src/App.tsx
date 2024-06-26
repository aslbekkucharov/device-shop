import ruRu from 'antd/locale/ru_RU'
import { ConfigProvider } from "antd"
import Modals from "@/components/Modals"
import Main from "@/components/layouts/Main"
import { AuthProvider } from "@/context/auth"
import { GlobalProvider } from "@/context/global"
import { themeConfiguration } from "@/config/theme"
import Header from "@/components/layouts/header/Header"
import Footer from "@/components/layouts/footer/Footer"

export default function App() {
  return (
    <ConfigProvider theme={themeConfiguration} locale={ruRu}>
      <AuthProvider>
        <GlobalProvider>
          <Header />
          <Main />
          <Footer />
          <Modals />
        </GlobalProvider>
      </AuthProvider>
    </ConfigProvider>
  )
}