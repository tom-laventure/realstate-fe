import instance from "Assets/Axios/axios";
import user from "Assets/Types/UserType";

const getCurrentUser = () => instance.get<user>(`v1/users`)

export default getCurrentUser