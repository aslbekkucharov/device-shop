import App from "@/App"
import Login from "@/views/login/Login"
import Product from "@/views/product/Product"
import Products from "@/views/products/Products"

import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,

        children: [
            {
                index: true,
                Component: Products
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: 'product/:id',
                Component: Product
            }
        ]
    },
])