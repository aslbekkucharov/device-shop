import { ConfigProvider } from "antd"
import Main from "@/components/layouts/Main"
import { themeConfiguration } from "@/config/theme"
import Header from "@/components/layouts/header/Header"
import Footer from "@/components/layouts/footer/Footer"

export default function App() {
  return (
    <ConfigProvider theme={themeConfiguration}>
      <Header />
      <Main />
      <Footer />
    </ConfigProvider>
  )
}