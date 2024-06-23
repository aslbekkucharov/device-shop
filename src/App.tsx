import { ConfigProvider } from "antd"
import Main from "@/components/layouts/Main"
import { themeConfiguration } from "@/config/theme"
import Header from "@/components/layouts/header/Header"
import Footer from "@/components/layouts/footer/Footer"
import { AuthProvider } from "./hooks/useAuth"

export default function App() {
  return (
    <ConfigProvider theme={themeConfiguration}>
      <AuthProvider>
        <Header />
        <Main />
        <Footer />
      </AuthProvider>
    </ConfigProvider>
  )
}