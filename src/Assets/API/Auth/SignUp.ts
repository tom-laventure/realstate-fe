import instance from '../../Axios/axios';


interface params {
    email: string,
    password: string,
    name: string
}

interface body {
    user: params
}

const signUp = async (body: body) => instance.post(`signup`, body)

export { body }
export default signUp