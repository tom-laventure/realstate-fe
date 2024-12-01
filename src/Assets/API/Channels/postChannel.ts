import instance from "Assets/Axios/axios";
import channel from "Assets/Types/ChannelType";


const postChannel = (body: channel) => instance.post<channel>(`v1/channels`, body)

export default postChannel