import React from 'react'
import { Button } from './components/ui/button'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AppLayout from './layout/appLayout'
import LandingPage from './pages/LandingPage'
import DashBoard from './pages/dashboard'
import Redirect from './pages/redirect'
import Auth from './pages/auth'
import Link from './pages/link'
import UrlProvider from './context/contextApi'
import RequireAuthDashboard from './components/requireAuthDashboard'



const router=createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/auth",
        element:<Auth/>
      },
      {
        path:"/:id",
        element:<Redirect/>
      },
      {
        path:"/dashboard",
        element:(
          <RequireAuthDashboard>
            <DashBoard/>
          </RequireAuthDashboard>
        )
      },
      {
        path:'/link/:id',
        element:(
          <RequireAuthDashboard>
             <Link/>
          </RequireAuthDashboard>
        )
      }
    ]
  }
])

const App = () => {
  return (
    <div>
      <UrlProvider>

       
         <RouterProvider router={router}/>
      </UrlProvider>
       
    </div>
  )
}

export default App