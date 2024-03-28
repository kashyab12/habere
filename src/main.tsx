import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoggedIn from "./components/LoggedIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/logind",
        element: <LoggedIn/>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
