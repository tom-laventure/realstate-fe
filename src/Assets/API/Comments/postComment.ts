import instance from "Assets/Axios/axios";
import comment, { commentMetaData } from "Assets/Types/EstateCommentType";

const postComment = (body: commentMetaData) => instance.post<comment>(`v1/estate_comments`, body)

export default postComment