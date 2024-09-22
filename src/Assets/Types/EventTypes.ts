import { Dayjs } from "dayjs";

interface person {
    username: string,
    userId: string
}

interface event {
    details: eventDetails,
    attendance: person[] | [],
    maxCapacity?: number
}

interface eventDetails {
    eventId: string,
    eventName: string,
    eventNotes?: string,
    eventDate: Dayjs | null,
    eventLimit?: number
}


export {event, person, eventDetails}