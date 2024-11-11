import { useQuery } from "@tanstack/react-query"
import getCurrentUser from "Assets/API/Auth/getCurrentUser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "Store/Reducers/account";


const useGetCurrentUser = (accountId: string) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading } = useQuery({
        queryKey: ['getCurrentUser'],
        enabled: !accountId,
        queryFn: () => getCurrentUser(),
        onSuccess: (data) => {
            if (data) {
                const user = data?.data

                if (!user) navigate('/')
                dispatch(updateUser(user))
            }
        }
    })


    return { isLoading }
}


export default useGetCurrentUser