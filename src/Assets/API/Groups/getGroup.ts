import instance from "Assets/Axios/axios";
import { group } from "Assets/Types/GroupType";


interface GetGroupResponseType {
    group: group,
    in_group: boolean
}


const getGroup = (id: string | undefined) => instance.get<GetGroupResponseType>(`v1/groups/${id}`)

export default getGroup