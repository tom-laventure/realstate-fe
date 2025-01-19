import instance from "Assets/Axios/axios";

const getGroup = (id: string) => instance.get(`v1/groups/${id}`)

export default getGroup