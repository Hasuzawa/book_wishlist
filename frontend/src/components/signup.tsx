import { useEffect, useState } from "react";


const Signup = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    useEffect(() => {

    }, [username])

    return (
        <form className="h-96 w-60 flex flex-col items-center">
            <h1>Registration</h1>
            <div>
                <label>Username:</label>
                <input
                    type="text"

                    required
                />
                <span>At least 6 characters long</span>
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="text"
                    required
                />
                <span>At least 8 characters long</span>
                <span>Has upper case and lower case</span>
                <span>Has number</span>
                <span>Has one of the following symbol: ._-</span>
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type="text"
                    required
                />
            </div>
        </form>
    )
}

export default Signup