import instance from '../../Axios/axios';

const signOut = async () => instance.delete(`logout`)

export default signOut