import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const DEFAULT_REDIRECT = "https://google.com"
const TICKTICK_LOGIN = "https://ticktick.com/"

function LoginWithTick() {
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

function App() {
    return (
        <>
            <h1>habere</h1>
            <div className="card">
                <LoginWithTick/>
                <p>
                    Click the above to authenticate with TickTick.
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
