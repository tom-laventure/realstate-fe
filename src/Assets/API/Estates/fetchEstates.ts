import instance from '../../Axios/axios';
import { group } from '../../Types/GroupTypes';

interface estateFetch {

}

const fetchEstates = async (id: string | undefined) => instance.get<estateFetch>(`v1/estates?group_id=${id}`)

export default fetchEstates