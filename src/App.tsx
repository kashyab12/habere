import './App.css'
import LoginWithTickTick from "./Login.tsx";

const TT_REDIRECT = "https://ticktick.com/oauth/authorize";

function App() {
    return (
        <>
            <h1>habere</h1>
            <div className="card">
                <LoginWithTickTick redirectURI={TT_REDIRECT}/>
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
