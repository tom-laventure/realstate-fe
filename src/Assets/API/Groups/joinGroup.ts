import instance from "Assets/Axios/axios";

export interface JoinGroupType {
    groupId: string | undefined
}

const joinGroup = ({ groupId }: JoinGroupType) => instance.post(`v1/groups/${groupId}/join_group`)

export default joinGroup