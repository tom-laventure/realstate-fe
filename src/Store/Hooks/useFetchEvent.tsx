import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import getEvents from "../../Assets/API/GetEvent"
import { event } from '../../Assets/Types/EventTypes';


type isLoading = boolean
type response = event
type isSuccess = boolean

const useFetchEvent = (id: string | undefined): [isLoading, response | undefined, isSuccess] => {
    const navigate = useNavigate()

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['fetchEvent', id],
        queryFn: () => {
            if(id !== undefined) return getEvents(id)
            navigate('/')
        },
        enabled: id !== undefined,
        
    })
    console.log(data)
    if (isError) navigate('/')

    return [isLoading, data?.data, isSuccess]
}

export default useFetchEvent