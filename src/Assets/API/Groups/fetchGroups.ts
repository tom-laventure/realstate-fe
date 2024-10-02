import instance from '../../Axios/axios';
import { group } from '../../Types/GroupType';

const fetchGroups = async () => instance.get<group[]>(`v1/groups`)

export default fetchGroups