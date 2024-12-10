import instance from "Assets/Axios/axios";
import estate, { estateMetaData } from "Assets/Types/EstateType";

interface PostEstateType {
    estate: estateMetaData,
    group_id: string
}

const postEstate = (data: PostEstateType) => instance.post<estate>(`v1/estates?group_id=${data.group_id}`, data.estate)

export { PostEstateType }
export default postEstate