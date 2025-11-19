import { useMutation } from '@tanstack/react-query'
import editSubcomment from 'Assets/API/SubComments/editSubcomment'
import { EditSubcommentParams } from 'Assets/Types/EstateSubCommentType'
import { useDispatch } from 'react-redux'
import { upsertSubcomment, setEditSubcomment } from 'Store/Reducers/subcomments'

interface UseEditSubcommentProps {
    complete?: () => void
}

const useEditSubcomment = ({ complete }: UseEditSubcommentProps = {}) => {
    const dispatch = useDispatch()
    return useMutation({
        mutationFn: (data: EditSubcommentParams) => editSubcomment(data),
        onSuccess: (res) => {
            dispatch(upsertSubcomment(res.data))
            dispatch(setEditSubcomment(undefined))
            complete?.()
        },
        retry: false,
    })
}

export default useEditSubcomment