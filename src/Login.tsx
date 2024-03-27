import './App.css'
import {constants} from './constants.ts'
import {useRef} from "react";


function LoginWithTickTick({buttonInfo}) {
    const onClickHandler = async () =>  {
        try {
            const fetchOptions: RequestInit = {
                method: "GET",
                mode: "cors",
                credentials: "include"
            }
            const getRedirectResponse = await fetch(constants.BACKEND_TT_REDIR_EP, fetchOptions)
            const jsonBody = await getRedirectResponse.json()
            if (jsonBody?.url) {
                // TODO: DOM related methods and event handlers, or can some react related methods be useful here?
                const popupWindow = window.open(jsonBody.url, "TickTick Login", "width=600,height=400")
            } else {
                console.log("received invalid response, toast with error")
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <button onClick={onClickHandler}>
                {buttonInfo}
            </button>
        </>
    )
}

export default LoginWithTickTick