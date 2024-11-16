import message from 'Assets/Types/MessageType';
import instance from '../../Axios/axios';

const fetchMessages = async (id: string | undefined, page: number | undefined = 0) => instance.get<message[]>(`v1/messages?group_id=${id}&per_page=10&page=${page}`)

export default fetchMessages