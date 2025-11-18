import instance from 'Assets/Axios/axios'

export interface DeleteSubcommentParams {
  id: number
}

const deleteSubcomment = (params: DeleteSubcommentParams) =>
  instance.delete<void>(`/v1/subcomments/${params.id}`)

export default deleteSubcomment