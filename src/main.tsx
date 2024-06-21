import React from 'react'
import { router } from '@/router'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

// Styles
import '@/assets/styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
