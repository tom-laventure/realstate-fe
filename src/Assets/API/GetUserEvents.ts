import instance from '../axios/axios';
import { eventDetails } from '../Types/EventTypes';

type data = {
    result: eventDetails[]
}

const getUserEvents = async (id: string) => instance.get<data>(`/get-user-events/${id}`)

export default getUserEvents