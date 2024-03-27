import './App.css'
import {constants} from './constants.ts'
// import {useRef} from "react";


function LoginWithTickTick({buttonInfo}: {buttonInfo: string}) {
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
                popupWindow?.addEventListener("storage", (sessionStoreEvent) =>  {
                    console.log("storage event!")
                    // TODO: how will we handle routing to logout route? Perhaps route after a timeout, not ideal though?
                    if (sessionStoreEvent.key?.toLowerCase().includes("authentication")) {
                        popupWindow.close()
                        // TODO: Route to login route.
                    }
                })
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