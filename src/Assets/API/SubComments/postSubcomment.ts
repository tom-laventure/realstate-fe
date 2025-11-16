import instance from "Assets/Axios/axios";
import subcomment from "Assets/Types/EstateSubCommentType";

interface PostSubcommentParams {
    comment: string;
    comment_id: number;
}

const postSubComment = (body: PostSubcommentParams) => instance.post<subcomment[]>(`v1/subcomments?estate_comment_id=${body.comment_id}`, body)

export { PostSubcommentParams };
export default postSubComment