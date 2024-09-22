import { useQuery } from "@tanstack/react-query"
import getUserEvents from "../../Assets/API/GetUserEvents";
import { eventDetails } from "../../Assets/Types/EventTypes";


type isLoading = boolean
type response = {
    data: {
        result: eventDetails[] | []
    }
}
type isSuccess = boolean

const useFetchUserEvents = (id: string | undefined): [isLoading, response, isSuccess] => {
    const intialResult = {
        data: {
            result: []
        }
    } as response
    const { isLoading, data, isSuccess } = useQuery({
        queryKey: ['fetchUserEvent', id],
        queryFn: (): Promise<response> => getUserEvents(id!),
        enabled: id !== '',
        placeholderData: intialResult
    })

    if(data) return [isLoading, data, isSuccess]
    else return [isLoading, intialResult, isSuccess]
}

export default useFetchUserEvents