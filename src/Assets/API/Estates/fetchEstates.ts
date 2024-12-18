import estate from 'Assets/Types/EstateType';
import instance from '../../Axios/axios';
import { group } from 'Assets/Types/GroupType';

interface FetchEstatesResponseType {
    estates: estate[],
    group: group
}

interface FetchEstateType {
    id?: string,
    order?: string
}

const fetchEstates = async ({ id, order }: FetchEstateType) => instance.get<FetchEstatesResponseType>(`v1/estates?group_id=${id}&orderby=${order}`)

export { FetchEstateType }
export default fetchEstates