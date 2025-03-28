import instance from "Assets/Axios/axios";
import comment from "Assets/Types/EstateCommentType";

const editComment = (body: comment) => instance.put<comment[]>(`v1/estate_comments/${body.id}`, body)

export default editComment