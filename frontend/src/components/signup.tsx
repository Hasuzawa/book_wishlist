import { useEffect, useState } from "react";
import "./signup.css"


const checkLength = (str: string, n: number): boolean => {
    return str.length >= n
}

const hasUpper = RegExp("[A-Z]")
const checkUpperCase = (str: string) => {
    return hasUpper.test(str)
}

const hasLower = RegExp("[a-z]")
const checkLowerCase = (str: string) => {
    return hasLower.test(str)
}

const hasNumber = RegExp("[0-9]")
const checkNumber = (str: string) => {
    return hasNumber.test(str)
}

const hasSymbols = RegExp("[\._\-]")
const checkSymbols = (str: string) => {
    return hasSymbols.test(str)
}

interface UsernameAuth {
    checkLength?: boolean
}

interface PasswordAuth {
    checkLength?: boolean,
    hasUpper?: boolean,
    hasLower?: boolean,
    hasNumber?: boolean,
    hasSymbols?: boolean
}


const Signup = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    const [usernameAuth, setUsernameAuth] = useState<UsernameAuth>({})
    const [passwordAuth, setPasswordAuth] = useState<PasswordAuth>({})


    useEffect(() => {
        setUsernameAuth({
            checkLength: checkLength(username, 6)
        })
        
    }, [username])

    useEffect(() => {
        setPasswordAuth({
            checkLength: checkLength(password, 8),
            hasUpper: checkUpperCase(password),
            hasLower: checkLowerCase(password),
            hasNumber: checkNumber(password),
            hasSymbols: checkSymbols(password)
        })

    }, [password])

    return (
        <form className="h-72 w-96 flex flex-col items-center bg-blue-300 p-4">
            <h1>Registration</h1>
            <div className="flex flex-col">
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <span className={usernameAuth.checkLength ? "valid" : "invalid"}>At least 6 characters long</span>
            </div>
            <div className="flex flex-col">
                <div>
                    <label>Password:</label>
                    <input
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <span
                    className={passwordAuth.checkLength ? "valid" : "invalid"}
                >
                    At least 8 characters long
                </span>
                <span
                    className={passwordAuth.hasUpper && passwordAuth.hasLower ? "valid" : "invalid"}
                >
                    Has upper case and lower case
                </span>
                <span
                    className={passwordAuth.hasNumber ? "valid" : "invalid"}
                >
                    Has number
                </span>
                <span
                    className={passwordAuth.hasSymbols ? "valid" : "invalid"}
                >
                    Has one of the following symbol: ._-
                </span>
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type="text"
                    required
                />
            </div>
            <button className="" disabled={true}>
                Register
            </button>
        </form>
    )
}

export default Signup