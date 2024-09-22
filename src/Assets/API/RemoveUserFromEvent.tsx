import instance from '../axios/axios';

interface body {
    eventId: string,
    userId: string
}

const RemoveUserFromEvent = async (body: body) => instance.delete('/remove-user-from-event', {data: body})

export default RemoveUserFromEvent
export {body}