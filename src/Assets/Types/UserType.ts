import { group } from "./GroupType"

interface user {
    first_name: string,
    last_name: string,
    email: string,
    phone?: string,
    address?: string,
    profile_completed: boolean,
    groups?: group[],
    next_step?: string
}

export default user