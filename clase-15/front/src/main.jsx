import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
// import App from './App.jsx'
// import Fetch from './Fetch.jsx'
// import FetchRealTime from './FetchRealTime.jsx'
import FetchGeo from './FetchGeo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FetchGeo />
  </StrictMode>,
)
