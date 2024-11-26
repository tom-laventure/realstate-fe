import instance from "Assets/Axios/axios";

const facebookLogin = (body: any) => instance.post('/users/auth/facebook/callback', body)