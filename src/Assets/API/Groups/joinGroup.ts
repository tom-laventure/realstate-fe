import instance from "Assets/Axios/axios";

export interface JoinGroupType {
    groupId: string | undefined,
    userId: number
}

const joinGroup = ({ groupId, userId }: JoinGroupType) => instance.post(`v1/groups/${groupId}/join_group`, { userId })

export default joinGroup