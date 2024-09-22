import { useQuery } from "@tanstack/react-query"
import signIn, {body} from "Assets/API/SignIn";

const useSignIn = (params: body) => {
    const { isError, data, error, isLoading } = useQuery({
        queryKey: ['signin'],
        queryFn: () => signIn(params)
      })

      return [isError, isLoading, data, error]
}


export default useSignIn