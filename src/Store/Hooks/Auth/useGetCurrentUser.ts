import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from 'aws-amplify/auth'
import getCurrentUserApi from 'Assets/API/Auth/getCurrentUser'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from 'Store/Reducers/account'
import { setGroupState } from 'Store/Reducers/groups'
import { AxiosError } from 'axios'

interface UseGetCurrentUserProps {
    onProfileIncomplete?: () => void
}

const useGetCurrentUser = ({ onProfileIncomplete }: UseGetCurrentUserProps = {}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading } = useQuery({
        queryKey: ['getCurrentUser'],
        retry: false,
        queryFn: async () => {
            return getCurrentUserApi()
        },
        onSuccess: (response) => {
            if (!response?.data) return

            const user = response.data
            const nextStep = user.next_step

            dispatch(updateUser(user))

            if (user.groups?.length) {
                dispatch(setGroupState(user.groups))
            }

            navigate('/' + (nextStep || ''))
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