import { useMutation } from '@tanstack/react-query'
import deleteSubcomment, { DeleteSubcommentParams } from 'Assets/API/SubComments/deleteSubcomment'
import { useDispatch } from 'react-redux'
import { removeSubcomment, setEditSubcomment } from 'Store/Reducers/subcomments'

interface UseDeleteSubcommentProps {
    complete?: () => void
}

const useDeleteSubcomment = ({ complete }: UseDeleteSubcommentProps = {}) => {
    const dispatch = useDispatch()
    return useMutation({
        mutationFn: (data: DeleteSubcommentParams) => deleteSubcomment(data),
        onSuccess: (_res, variables) => {
            dispatch(removeSubcomment(variables.id))
            dispatch(setEditSubcomment(undefined))
            complete?.()
        },
        retry: false,
    })
}

export default useDeleteSubcomment