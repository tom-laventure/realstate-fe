import { Dayjs } from 'dayjs';
import instance from '../axios/axios';

interface body {
    eventName: string,
    eventNotes: string | undefined,
    username: string,
    userId: string,
    eventDate: Dayjs
}

const createEvents = async (body: body) => instance.post('/create-event', body)

export default createEvents
export {body}