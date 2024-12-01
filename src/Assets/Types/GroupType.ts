import channel from "./ChannelType"
import users from "./UserType"

interface group {
    id?: number,
    name: string,
    users: users[],
    active_listings: number,
    channel: channel[]
}


export { group }
