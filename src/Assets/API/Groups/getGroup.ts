import instance from "Assets/Axios/axios";
import { group } from "Assets/Types/GroupType";


const getGroup = (id: string | undefined) => instance.get<group>(`v1/groups/${id}`)

export default getGroup