import instance from "Assets/Axios/axios";

const getGroup = (id: string) => instance.get(`v1/group/${id}`)

export default getGroup