import { useMutation } from "@tanstack/react-query"
import AddUserToEvent, { body } from "../../Assets/API/AddUserToEvent"
import RemoveUserFromEvent, { body as removeUserBody } from "../../Assets/API/RemoveUserFromEvent"

const useAddAttendance = () => {
    const { mutate } = useMutation({
        mutationFn: (body: body) => AddUserToEvent(body)
    })

    return [mutate]
}

const useRemoveAttendance = () => {
    const { mutate } = useMutation({
        mutationFn: (body: removeUserBody) => RemoveUserFromEvent(body)
    })

    return [mutate]
}

export { useAddAttendance, useRemoveAttendance }