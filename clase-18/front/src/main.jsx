import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import Layout from './components/Layout'
import { lazy } from 'react'
import { Suspense } from 'react'
import ProtectedRoute from './components/ProtectedRoute'

const Home = lazy(() => import("./pages/Home"))
const App = lazy(() => import("./pages/App"))
const Contact = lazy(() => import("./pages/Contact"))
const Ciudades = lazy(() => import("./pages/Ciudades"))
const DetalleCiudad = lazy(() => import("./pages/DetalleCiudad"))
const Login = lazy(() => import("./pages/Login"))
const Logout = lazy(() => import("./pages/Logout"))

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
        path: "/ciudades",
        element: <Suspense fallback={<div>Cargando...</div>}><ProtectedRoute rol={["admin", "superadmin", "user"]} element={<Ciudades />} /></Suspense>
      },
      {
        path: "/ciudades/:id",
        element: <Suspense fallback={<div>Cargando...</div>} ><ProtectedRoute rol={["superadmin"]} element={<DetalleCiudad />} /></Suspense>
      },
      {
        path: "/login",
        element: <Suspense fallback={<div>Cargando...</div>} ><Login /></Suspense>
      },
      {
        path: "/logout",
        element: <Suspense fallback={<div>Cargando...</div>} ><Logout /></Suspense>
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
