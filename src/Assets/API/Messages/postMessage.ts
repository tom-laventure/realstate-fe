import instance from "Assets/Axios/axios";
import message from "Assets/Types/MessageType";

const postMessage = (body: message) => instance.post<null>(`v1/messages`, body)

export default postMessage