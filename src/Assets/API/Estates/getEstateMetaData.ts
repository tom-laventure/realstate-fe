import instance from "Assets/Axios/axios";
import { estateMetaData } from "Assets/Types/EstateType";

const getEstateMetaData = (url: string) => instance.get<estateMetaData>(`/v1/estates/preview_data?url=${url}`)

export default getEstateMetaData