import instance from '../axios/axios';

interface body {
    eventId: string,
    userId: string,
    username: string
}

const AddUserToEvent = async (body: body) => {
    console.log(body)
    return instance.put('/add-user-to-event', body)
}

export default AddUserToEvent
export { body }