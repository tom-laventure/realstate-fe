import estate from 'Assets/Types/EstateType';
import instance from '../../Axios/axios';
import { group } from 'Assets/Types/GroupType';

interface FetchEstatesResponseType {
    estates: estate[],
    group: group
}

export interface FetchEstateType {
    id?: string
    order?: string
    favorites_only?: boolean
}

const fetchEstate = (params: FetchEstateType) =>
    instance.get<FetchEstatesResponseType>(`v1/estates?group_id=${params.id}&order=${params.order || 'desc'}&favorites_only=${params.favorites_only || false}`)

export default fetchEstate