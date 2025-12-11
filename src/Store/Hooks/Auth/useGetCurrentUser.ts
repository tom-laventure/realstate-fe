import { useQuery } from "@tanstack/react-query"
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'
import getCurrentUserApi from "Assets/API/Auth/getCurrentUser"
import { AxiosError } from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateUser } from "Store/Reducers/account"
import { setGroupState } from "Store/Reducers/groups"


const useGetCurrentUser = (accountId: number) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading } = useQuery({
        queryKey: ['getCurrentUser'],
        enabled: !accountId,
        queryFn: async () => {
            // First check if user is authenticated with Cognito
            try {
                const cognitoUser = await getCurrentUser()
                const session = await fetchAuthSession()

                if (!session.tokens?.accessToken) {
                    throw new Error('No access token')
                }

                // Then fetch user data from your backend
                return getCurrentUserApi()
            } catch (error) {
                // User not authenticated with Cognito
                navigate('/login')
                throw error
            }
        },
        onSuccess: (data) => {
            if (data) {
                const user = data?.data
                const groups = user.groups
                dispatch(updateUser(user))
                if (groups?.length) {
                    dispatch(setGroupState(groups))
                } else {
                    navigate('/')
                }
            }
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 401) {
                navigate('/login')
            }
        },
        retry: false
    })


    return { isLoading }
}


export default useGetCurrentUser