import { useMutation } from "@tanstack/react-query"
import signIn, { body } from "Assets/API/Auth/SignIn";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "Store/Reducers/account";


const useSignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, mutate } = useMutation({
    mutationFn: (params: body) => signIn(params),
    onSuccess: (data) => {
      if (data) {
        const authorizationHeader = data.headers;
        const user = data?.data?.user

        if (authorizationHeader['authorization']) localStorage.setItem('authToken', authorizationHeader['authorization'])
        console.log(data.data)
        dispatch(updateUser(user))

        navigate('/')
      }
    }
  })


  return { isLoading, mutate }
}


export default useSignIn