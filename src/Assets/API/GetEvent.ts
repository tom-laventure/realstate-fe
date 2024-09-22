import instance from '../axios/axios';
import { event } from '../Types/EventTypes';

const getEvents = async (id: string) => instance.get<event>(`/get-event/${id}`) 

export default getEvents