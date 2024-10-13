import instance from "Assets/Axios/axios";
import subcomment from "Assets/Types/EstateSubCommentType";

const fetchSubComments = (id: string | undefined) => instance.get<subcomment[]>(`v1/subcomments?estate_comment_id=${id}`)

export default fetchSubComments