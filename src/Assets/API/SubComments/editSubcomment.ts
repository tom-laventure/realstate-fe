import axios from 'axios'
import subcomment from 'Assets/Types/EstateSubCommentType'

export interface EditSubcommentParams {
    id: number
    comment: string
}
export type EditSubcommentResponse = subcomment

const editSubcomment = (params: EditSubcommentParams) =>
    axios.patch<EditSubcommentResponse>(`/v1/subcomments/${params.id}`, { comment: params.comment })

export default editSubcomment