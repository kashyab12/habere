import './App.css'

const DEFAULT_REDIRECT = "https://google.com"

function LoginButton({link, buttonInfo}) {
    return (
        <>
            <a href={link? link: DEFAULT_REDIRECT} target="_blank">
                <button>
                    {buttonInfo}
                </button>
            </a>
        </>
    )
}

function LoginWithTickTick({redirectURI}) {
    return (
        <LoginButton link={redirectURI} buttonInfo="Login with TickTick"/>
    )
}

export default LoginWithTickTick