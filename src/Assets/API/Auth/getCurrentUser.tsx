import instance from "Assets/Axios/axios";
import users from "Assets/Types/UserType";

const getCurrentUser = () => instance.get<users>(`v1/users`)

export default getCurrentUser