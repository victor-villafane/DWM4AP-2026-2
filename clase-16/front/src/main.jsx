import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import Layout from './components/Layout'
import { lazy } from 'react'
import { Suspense } from 'react'

const Home = lazy( () => import("./pages/Home") )
const App = lazy( () => import("./pages/App") )
const Contact = lazy( () => import("./pages/Contact") )
const Productos = lazy( () => import("./pages/Productos") )

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<div>Cargando...</div>} ><Home /></Suspense>,
      },
      {
        path: "/tareas",
        element: <Suspense fallback={<div>Cargando...</div>} ><App /></Suspense>
      },
      {
        path: "/contact",
        element: <Suspense fallback={<div>Cargando...</div>} ><Contact /></Suspense>
      },
      {
        path: "/productos",
        element: <Suspense fallback={<div>Cargando...</div>}><Productos /></Suspense>
      }
    ]
  },
  {
    path: "/admin",
    element: <div>Layout para admin</div>,
    children: []
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
