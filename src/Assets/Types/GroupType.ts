import users from "./UserType"

interface group {
    id?: number,
    name: string,
    users: users[],
    active_listings: number
}


export { group }
