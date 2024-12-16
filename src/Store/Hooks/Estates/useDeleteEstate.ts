import { useMutation } from "@tanstack/react-query"
import deleteEstate from "Assets/API/Estates/deleteEstate"

interface UsePostDeleteProps {
    complete: () => void
}


const useDeleteEstate = ({ complete }: UsePostDeleteProps) => {

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (id: number) => deleteEstate(id),
        retry: false,
        onSuccess: () => {
            complete()
        }
    })

    return { isLoading, mutate }
}

export default useDeleteEstate