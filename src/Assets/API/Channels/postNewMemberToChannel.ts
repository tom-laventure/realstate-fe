import instance from "Assets/Axios/axios";
import message from "Assets/Types/MessageType";

const postNewMemeberToChannel = async (id: string ) => instance.post(`v1/channels/${id}/add_to_channel`)

export default postNewMemeberToChannel