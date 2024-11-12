import user from 'Assets/Types/UserType';
import instance from '../../Axios/axios';


interface params {
    email: string,
    password: string
}

interface body {
    user: params
}

const signIn = async (body: body) => {
    localStorage.removeItem('authToken')
    return instance.post<user>(`login`, body)
}

export { body }
export default signIn