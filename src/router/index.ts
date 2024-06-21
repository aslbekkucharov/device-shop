import App from "@/App"
import Products from "@/views/products/Products"

import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([{
    path: "/",
    Component: App,

    children: [{
        index: true,
        Component: Products
    }]
}])