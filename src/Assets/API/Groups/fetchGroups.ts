import instance from '../../Axios/axios';
import { group } from '../../Types/GroupTypes';

const fetchGroups = async () => instance.get<group>(`/groups`) 

export default fetchGroups