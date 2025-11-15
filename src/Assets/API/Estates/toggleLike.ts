import instance from "Assets/Axios/axios";

interface ToggleLikeParams {
    group_id: string | number;
    estate_id: string | number;
}

interface ToggleLikeResponse {
    liked: boolean;
}

const toggleLike = ({ group_id, estate_id }: ToggleLikeParams) =>
    instance.post<ToggleLikeResponse>(`/v1/groups/${group_id}/toggle_like`, { estate_id });

export type { ToggleLikeParams, ToggleLikeResponse };
export default toggleLike;