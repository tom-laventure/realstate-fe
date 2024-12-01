import instance from "Assets/Axios/axios";
import message from "Assets/Types/MessageType";

const fetchChannelMessages = async (id: string | undefined, page: number | undefined = 0) => instance.get<message[]>(`v1/channel?group_id=${id}&per_page=10&page=${page}`)

export default fetchChannelMessages