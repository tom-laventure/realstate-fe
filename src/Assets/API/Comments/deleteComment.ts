import instance from "Assets/Axios/axios";
import comment from "Assets/Types/EstateCommentType";

const deleteComment = (id: number) => instance.delete<comment>(`v1/estate_comments/${id}`)

export default deleteComment