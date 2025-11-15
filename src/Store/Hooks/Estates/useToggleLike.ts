import { useMutation } from "@tanstack/react-query";
import toggleLike, { ToggleLikeParams, ToggleLikeResponse } from "Assets/API/Estates/toggleLike";
import { AxiosResponse } from "axios";

interface UseToggleLikeProps {
    complete: () => void;
}

const useToggleLike = ({ complete }: UseToggleLikeProps) => {
    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (data: ToggleLikeParams) => toggleLike(data),
        retry: false,
        onSuccess: (data: AxiosResponse<ToggleLikeResponse, any>) => {
            const estate = data.data
            complete()
        }
    })

    return { isLoading, mutate }
}

export default useToggleLike;