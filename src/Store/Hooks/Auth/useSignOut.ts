import { useMutation } from "@tanstack/react-query"
import signOut from "Assets/API/Auth/SignOut";
import { useNavigate } from "react-router-dom";


const useSignOut = () => {
    const navigate = useNavigate()

    const { isLoading, mutate } = useMutation({
        mutationFn: () => signOut(),
        onSuccess: () => {
            localStorage.removeItem('authToken')
            navigate('/login')
        }
    })


    return { isLoading, mutate }
}


export default useSignOut