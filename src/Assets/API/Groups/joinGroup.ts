import instance from "Assets/Axios/axios";

interface JoinGroupType {
    groupId: string,
    userId: string
}

const joinGroup = ({groupId, userId}: JoinGroupType) => instance.post(`v1/group/${groupId}`, {userId})