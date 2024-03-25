import './App.css'
import {constants} from './constants.ts'

function LoginButton({onClickFunc, buttonInfo}) {
    return (
        <>
            <button onClick={redirectOnClickHandler}>
                {buttonInfo}
            </button>
        </>
    )
}

function LoginWithTickTick() {
    return (
        <LoginButton onClick={redirectOnClickHandler} buttonInfo="Login with TickTick"/>
    )
}

const redirectOnClickHandler = async () => {
    try {
        const corsHeader: HeadersInit = new Headers()
        const fetchOptions: RequestInit = {
            method: "GET",
            mode: "cors",
            credentials: "include"
        }
        const getRedirectResponse = await fetch(constants.BACKEND_TT_REDIR_EP, fetchOptions)
        const jsonBody = await getRedirectResponse.json()
        if (jsonBody?.url) {
            window.open(jsonBody.url, '_blank')
        } else {
            console.log("received invalid response, toast with error")
        }
    } catch (e) {
        console.log(e)
    }
}

export default LoginWithTickTick