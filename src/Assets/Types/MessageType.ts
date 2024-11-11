interface message {
    message: string,
    id?: number,
    created_at?: string,
    user_id?: number,
    group_id?: number | string,
    message_owner?: string
}

export default message