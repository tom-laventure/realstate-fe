import { useMutation } from "@tanstack/react-query"
import signIn, { body } from "Assets/API/Auth/SignIn";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "Store/Reducers/account";
import { setGroupState } from "Store/Reducers/groups";

interface UseSignInProps {
  complete?: () => void
}

const useSignIn = ({ complete }: UseSignInProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, mutate } = useMutation({
    mutationFn: (params: body) => signIn(params),
    onSuccess: (data) => {
      if (data) {
        const authorizationHeader = data.headers;
        const user = data?.data
        const groups = user.groups

        if (authorizationHeader['authorization']) localStorage.setItem('authToken', authorizationHeader['authorization'])

        dispatch(updateUser(user))
        if (groups) dispatch(setGroupState(groups))

        if (complete) complete()
        else if (groups?.length) navigate(`/estates/${groups[0].id}`)
        else navigate('/')
      }
    }
  })


  return { isLoading, mutate }
}


export default useSignIn