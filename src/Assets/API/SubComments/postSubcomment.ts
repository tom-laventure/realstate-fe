import instance from "Assets/Axios/axios";
import subcomment from "Assets/Types/EstateSubCommentType";

const postSubComment = (body: subcomment) => instance.post<subcomment>(`v1/subcomments`, body)

export default postSubComment