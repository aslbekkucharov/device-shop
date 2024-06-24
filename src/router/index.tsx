import App from "@/App"
import Login from "@/views/login/Login"
import Product from "@/views/product/Product"
import Products from "@/views/products/Products"

import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

        children: [
            {
                index: true,
                element: <Products />
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'product/:id',
                element: <Product />
            },
        ]
    }
])