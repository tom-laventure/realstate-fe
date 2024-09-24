import { useMutation, UseMutationResult } from "@tanstack/react-query"
import signIn, { body } from "Assets/API/Auth/SignIn";


const useSignIn = () => {

  const { isLoading, mutate } = useMutation({
    mutationFn: (params: body) => signIn(params),
    onSuccess: (data) => {
      if (data) {
        const authorizationHeader = data.headers;
        console.log(authorizationHeader['authorization']);
      }
    }
  })


  return { isLoading, mutate }
}


export default useSignIn