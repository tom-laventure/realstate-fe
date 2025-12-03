import estate from 'Assets/Types/EstateType';
import instance from '../../Axios/axios';
import { group } from 'Assets/Types/GroupType';

interface FetchEstatesResponseType {
    estates: estate[],
    group: group
}

export interface FetchEstateType {
    id?: string,
    order?: string,
    favorites_only?: boolean,
    filter_by?: string
}

const fetchEstate = (params: FetchEstateType) =>
    instance.get<FetchEstatesResponseType>(`v1/estates?group_id=${params.id}&order=${params.order || 'desc'}&favorites_only=${params.favorites_only || false}&filter_by=${params.filter_by || ''}`)

export default fetchEstate