import instance from '../../Axios/axios';


interface params {
    email: string,
    password: string
}

interface body {
    user: params
}

const signIn = async (body: body) => instance.post(`login`, body)

export { body }
export default signIn