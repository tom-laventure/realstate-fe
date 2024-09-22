import instance from '../Axios/axios';

interface body {
    name: string,
    email: string,
    password: string
}

const signIn = async (body: body) => instance.post(`/login`, body)

export { body }
export default signIn