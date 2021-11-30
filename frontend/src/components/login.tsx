import { useEffect, useState } from "react"

const Login = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = () => {

    }



    return (
        <form className="flex flex-col bg-red-300 w-96 h-60 items-center">
            <h1>Login</h1>
            <div className="flex flex-row">
                <label>
                    Username:
                </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="flex flex-row">
                <label>
                    Password:
                </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button>
                login
            </button>
        </form>
    )

}

export default Login