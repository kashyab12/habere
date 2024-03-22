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
        const getRedirectResponse = await fetch(constants.BACKEND_TT_REDIR_EP)
        if (!getRedirectResponse.redirected) {
            console.log("received invalid response, toast with error")
        } else if (getRedirectResponse.headers.get("Location") != null) {
            window.open(getRedirectResponse.headers.get("Location"), '_blank')
        } else {
            console.log("received invalid response, toast with error")
        }
    } catch (e) {
        console.log("received invalid response, toast with error")
    }
}

export default LoginWithTickTick