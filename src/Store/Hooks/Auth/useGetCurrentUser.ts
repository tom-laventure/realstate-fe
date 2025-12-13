import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from 'aws-amplify/auth'
import getCurrentUserApi from 'Assets/API/Auth/getCurrentUser'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from 'Store/Reducers/account'
import { setGroupState } from 'Store/Reducers/groups'
import { AxiosError } from 'axios'

const useGetCurrentUser = (accountId: number) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading } = useQuery({
        queryKey: ['getCurrentUser'],
        enabled: !accountId,
        retry: false,
        queryFn: async () => {
            return getCurrentUserApi()
        },
        onSuccess: (data) => {
            if (!data) return
            const user = data.data
            dispatch(updateUser(user))
            if (user.groups?.length) {
                dispatch(setGroupState(user.groups))
            } else {
                // navigate('/')
            }
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 401) {
                navigate('/login')
            }
        }
    })

    return { isLoading }
}

export default useGetCurrentUser