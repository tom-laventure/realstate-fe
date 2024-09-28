import { useMutation } from "@tanstack/react-query"
import signIn, { body } from "Assets/API/Auth/SignIn";
import { useNavigate } from "react-router-dom";


const useSignIn = () => {
  const navigate = useNavigate()

  const { isLoading, mutate } = useMutation({
    mutationFn: (params: body) => signIn(params),
    onSuccess: (data) => {
      if (data) {
        const authorizationHeader = data.headers;

        if (authorizationHeader['authorization']) localStorage.setItem('authToken', authorizationHeader['authorization'])
        // navigate('/')
      }
    }
  })


  return { isLoading, mutate }
}


export default useSignIn