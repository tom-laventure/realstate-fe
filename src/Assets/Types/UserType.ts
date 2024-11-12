import { group } from "./GroupType"

interface user {
    name: string,
    id: number,
    groups?: group[]
}

export default user