import instance from "Assets/Axios/axios";
import comment from "Assets/Types/EstateCommentType";

const postComment = (body: comment) => instance.post<comment>(`v1/estate_comments`, body)

export default postComment