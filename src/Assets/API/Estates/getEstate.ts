import estate from 'Assets/Types/EstateType';
import instance from '../../Axios/axios';


interface GetEstateType {
    selected_estate: estate
}

const getEstate = async (groupId: string | undefined, estateId: string | undefined) => instance.get<GetEstateType>(`v1/estates/${estateId}?group_id=${groupId}`)

export default getEstate