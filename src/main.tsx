import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './index.css'
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import LoggedIn from "./components/LoggedIn";
import {constants} from "./constants";

const validSessionLoader = async () => {
    const fetchOptions: RequestInit = {
        method: "GET",
        mode: "cors",
        credentials: "include"
    }
    const isValidSessionResp = await fetch(constants.VALID_SESSION_ENDPOINT, fetchOptions)
    if (isValidSessionResp.status == constants.HTTP_STATUS_OK) {
        throw redirect("/tt")
    }
    return null
}


const router = createBrowserRouter([
    {
        path: "/",
        loader: validSessionLoader,
        element: <App />
    },
    {
        path: "/tt",
        element: <LoggedIn/>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
