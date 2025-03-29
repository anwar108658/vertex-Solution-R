import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login.jsx'
import DashBoard from './pages/DashBoard.jsx'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: 'login',
        element: <Login />,
      },
      {
        path:'/dashboard',
        element:<DashBoard/>,
      },
      {
        path:'/menus',
        element:<DashBoard/>
      },
      {
        path:'/form',
        element:<DashBoard/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={route}/>
    </Provider>
  </StrictMode>,
)
