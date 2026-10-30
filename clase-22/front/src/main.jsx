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
const Ciudades = lazy(() => import("./pages/crud/Ciudades"))
const DetalleCiudad = lazy(() => import("./pages/crud/DetalleCiudad"))
const Login = lazy(() => import("./pages/auth/Login"))
const Logout = lazy(() => import("./pages/auth/Logout"))
const NuevoPais = lazy(() => import("./pages/crud/NuevoPais"))
const EditarCiudad = lazy(() => import("./pages/crud/EditarCiudad"))
const EliminarCiudad = lazy(() => import("./pages/crud/EliminarCiudad"))
const Register = lazy(() => import("./pages/auth/Register"))

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
        path: "/nuevo-pais",
        element: <Suspense fallback={<div>Cargando...</div>}>
          <ProtectedRoute rol={["admin", "superadmin", "user"]} element={<NuevoPais />} />
        </Suspense>
      },
      {
        path: "/editar-pais/:id",
        element: <Suspense fallback={<div>Cargando...</div>}>
          <ProtectedRoute rol={["admin", "superadmin", "user"]} element={<EditarCiudad />} />
        </Suspense>
      },
      {
        path: "/eliminar-pais/:id",
        element: <Suspense fallback={<div>Cargando...</div>}>
          <ProtectedRoute rol={["admin", "superadmin", "user"]} element={<EliminarCiudad />} />
        </Suspense>
      },
      {
        path: "/ciudades/:id",
        element: <Suspense fallback={<div>Cargando...</div>} >
          <ProtectedRoute rol={["user", "admin", "superadmin"]} element={<DetalleCiudad />} /></Suspense>
      },
      {
        path: "/login",
        element: <Suspense fallback={<div>Cargando...</div>} ><Login /></Suspense>
      },
      {
        path: "/register",
        element: <Suspense fallback={<div>Cargando...</div>} ><Register /></Suspense>
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
