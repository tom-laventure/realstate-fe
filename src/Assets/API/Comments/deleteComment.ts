import instance from "Assets/Axios/axios";
import comment from "Assets/Types/EstateCommentType";

interface DeleteCommentProps {
    commentId: number,
    estateId: number
}

const deleteComment = ({ commentId, estateId }: DeleteCommentProps) => instance.delete<comment[]>(`v1/estate_comments/${commentId}?estate_id=${estateId}`)

export default deleteComment
export { DeleteCommentProps }