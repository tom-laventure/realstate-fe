import { useMutation } from "@tanstack/react-query"
import signUp, { body } from "Assets/API/Auth/SignUp";
import { useNavigate } from "react-router-dom";


const useSignUp = () => {
  const navigate = useNavigate()

  const { isLoading, mutate } = useMutation({
    mutationFn: (params: body) => signUp(params),
    onSuccess: (data) => {
      if (data) {
        const authorizationHeader = data.headers;

        if (authorizationHeader['authorization']) localStorage.setItem('authToken', authorizationHeader['authorization'])
        navigate('/')
      }
    }
  })


  return { isLoading, mutate }
}


export default useSignUp