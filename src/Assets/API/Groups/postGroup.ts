import instance from "Assets/Axios/axios";
import { group } from "Assets/Types/GroupType";

interface PostGroupType {
    name: string
}

const postGroup = (body: PostGroupType) => instance.post<group[]>('/v1/groups/create', body)

export { PostGroupType }
export default postGroup