import { useContext, useEffect } from "react";
import { AuthContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function PrivateRouter({ component, roles_admisibles = [null], redirect_to, require_authentication = true }) {
    const { userAuthProvider } = useContext(AuthContext);
    const navigate = useNavigate();

    if ((require_authentication !== userAuthProvider.auth) || (!roles_admisibles.includes(userAuthProvider.role))) {
        useEffect(() => {
            navigate(redirect_to)
        }, [])
        return null
    }

    return component;
}
