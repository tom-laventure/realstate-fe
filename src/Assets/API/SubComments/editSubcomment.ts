import subcomment from 'Assets/Types/EstateSubCommentType'
import instance from 'Assets/Axios/axios'

export interface EditSubcommentParams {
    id: number
    comment: string
}
export type EditSubcommentResponse = subcomment

const editSubcomment = (params: EditSubcommentParams) =>
    instance.patch<EditSubcommentResponse>(`/v1/subcomments/${params.id}`, { comment: params.comment })

export default editSubcomment