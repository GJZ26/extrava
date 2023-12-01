import { useContext } from "react"
import { AuthContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

export default function Exit() {
    const { userAuthProvider, setAuthProvider } = useContext(AuthContext)
    const navigate = useNavigate()

    setAuthProvider(null, true)
    navigate('/')
    return null
}