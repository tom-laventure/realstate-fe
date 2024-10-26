import estate from 'Assets/Types/EstateType';
import instance from '../../Axios/axios';
import { group } from 'Assets/Types/GroupType';

interface FetchEstatesType {
    estates: estate[],
    groups: group[]
}

const fetchEstates = async (id: string | undefined) => instance.get<FetchEstatesType>(`v1/estates?group_id=${id}`)

export default fetchEstates