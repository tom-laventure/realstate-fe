import axios from 'axios'

export interface DeleteSubcommentParams {
  id: number
}

const deleteSubcomment = (params: DeleteSubcommentParams) =>
  axios.delete<void>(`/v1/subcomments/${params.id}`)

export default deleteSubcomment