import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import Error from './views/Error.jsx'
import About from './views/About.jsx'
import Booking from './views/booking.jsx'
import Loading from './views/Loading.jsx'
import Success from './views/Success.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/booking",
    element: <Booking />
  },
  {
    path: "/loading",
    element: <Loading />
  },
  {
    path: "/success",
    element: <Success />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
