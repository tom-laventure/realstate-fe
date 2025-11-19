import instance from "Assets/Axios/axios";
import comment, { commentMetaData } from "Assets/Types/EstateCommentType";

const editComment = (body: commentMetaData) => instance.put<comment[]>(`v1/estate_comments/${body.id}`, body)

export default editComment