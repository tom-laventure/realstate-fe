import instance from '../../Axios/axios';
import { group } from '../../Types/GroupTypes';

interface groupsFetch {
    data: group[]
}

const fetchGroups = async () => instance.get<groupsFetch>(`v1/groups`)

export default fetchGroups