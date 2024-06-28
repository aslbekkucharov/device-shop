import React from 'react'
import { router } from '@/router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { store } from '@/store'

// Styles
import '@/assets/styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
