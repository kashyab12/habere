const DEFAULT_REDIRECT = "https://google.com"
const TICKTICK_LOGIN = "https://ticktick.com/"

function LoginWithTickTick() {
    return (
        <LoginButton title={TICKTICK_LOGIN} buttonInfo="Login with TickTick"/>
    )
}

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

export default LoginWithTickTick