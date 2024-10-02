import estate from 'Assets/Types/EstateType';
import instance from '../../Axios/axios';

const fetchEstates = async (id: string | undefined) => instance.get<estate[]>(`v1/estates?group_id=${id}`)

export default fetchEstates