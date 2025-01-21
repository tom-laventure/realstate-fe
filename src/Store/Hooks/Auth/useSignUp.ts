import { useMutation } from "@tanstack/react-query"
import signUp, { body } from "Assets/API/Auth/SignUp";
import { useNavigate } from "react-router-dom";

interface UseSignUpProps {
  complete?: () => void
}

const useSignUp = ({ complete }: UseSignUpProps) => {
  const navigate = useNavigate()

  const { isLoading, mutate } = useMutation({
    mutationFn: (params: body) => signUp(params),
    onSuccess: (data) => {
      if (data) {
        const authorizationHeader = data.headers;

        if (authorizationHeader['authorization']) localStorage.setItem('authToken', authorizationHeader['authorization'])
        if (complete) complete()
        else navigate('/')
      }
    }
  })


  return { isLoading, mutate }
}


export default useSignUp