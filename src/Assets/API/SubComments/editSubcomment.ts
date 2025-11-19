import subcomment, { EditSubcommentParams } from 'Assets/Types/EstateSubCommentType'
import instance from 'Assets/Axios/axios'


const editSubcomment = (params: EditSubcommentParams
) =>
    instance.patch<subcomment>(`/v1/subcomments/${params.id}`, { comment: params.comment })

export default editSubcomment