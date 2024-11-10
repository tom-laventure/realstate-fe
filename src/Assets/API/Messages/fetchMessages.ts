import message from 'Assets/Types/MessageType';
import instance from '../../Axios/axios';

const fetchMessages = async (id: string | undefined) => instance.get<message[]>(`v1/messages?group_id=${id}`)

export default fetchMessages