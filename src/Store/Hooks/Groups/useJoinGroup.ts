import { useMutation } from "@tanstack/react-query"
import joinGroup, { JoinGroupType } from "Assets/API/Groups/joinGroup"

interface UseJoinGroupProps {
    complete: () => void
}


const useJoinGroup = ({ complete }: UseJoinGroupProps) => {


    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (body: JoinGroupType) => joinGroup(body),
        retry: false,
        onSuccess: (data) => {
            complete()
        }
    })

    return { isLoading, mutate }
}

export default useJoinGroup