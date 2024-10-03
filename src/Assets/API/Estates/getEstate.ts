import estate from 'Assets/Types/EstateType';
import instance from '../../Axios/axios';

const getEstate = async (groupId: string | undefined, estateId: string | undefined) => instance.get<estate>(`v1/estates/${estateId}?group_id=${groupId}`)

export default getEstate