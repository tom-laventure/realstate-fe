import { useMutation } from "@tanstack/react-query"
import createEvents, {body} from "../../Assets/API/CreateEvent";
import { useNavigate } from "react-router-dom";

const useCreateEvent = () => {
    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationFn: (event: body) => createEvents(event),
        onSuccess:  (data) => navigate(`/dashboard/${data.data.eventId}`),
        onError: () => navigate('/')
    })

   return [mutate]
}

export default useCreateEvent