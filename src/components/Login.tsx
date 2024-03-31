import '../App.css'
import {constants} from '../constants.ts'


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
                window.location.href = jsonBody.url
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