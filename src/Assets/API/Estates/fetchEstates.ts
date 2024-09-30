import instance from '../../Axios/axios';
import { group } from '../../Types/GroupTypes';

interface estateFetch {

}

const fetchEstates = async (id: number) => instance.get<estateFetch>(`v1/estate/${id}`)

export default fetchEstates