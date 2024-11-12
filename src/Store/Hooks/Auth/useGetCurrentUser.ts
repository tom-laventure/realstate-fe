import { useQuery } from "@tanstack/react-query"
import getCurrentUser from "Assets/API/Auth/getCurrentUser";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "Store/Reducers/account";
import { setGroupState } from "Store/Reducers/groups";


const useGetCurrentUser = (accountId: number) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { group_id } = useParams()

    const { isLoading } = useQuery({
        queryKey: ['getCurrentUser'],
        enabled: !accountId,
        queryFn: () => getCurrentUser(),
        onSuccess: (data) => {
            if (data) {
                const user = data?.data
                const groups = user.groups
                dispatch(updateUser(user))
                if (group_id) navigate(`/estates/${group_id}`)
                else if (groups?.length) {
                    dispatch(setGroupState(groups))
                    navigate(`/estates/${groups[0].id}`)
                }
                else navigate('/')
            }
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 401) {
                navigate('/login');
            }
        },
    })


    return { isLoading }
}


export default useGetCurrentUser