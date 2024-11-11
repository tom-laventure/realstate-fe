import { useMutation } from "@tanstack/react-query"
import signOut from "Assets/API/Auth/SignOut";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "Store/Reducers/account";


const useSignOut = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoading, mutate } = useMutation({
        mutationFn: () => signOut(),
        onSettled: () => {
            localStorage.removeItem('authToken')
            dispatch(clearUser())
            navigate('/login')
        }
    })


    return { isLoading, mutate }
}


export default useSignOut