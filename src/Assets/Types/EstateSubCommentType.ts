interface subcomment {
    id: number,
    comment: string,
    comment_owner?: number,
    is_author?: boolean,
    created_at: string,
    updated_at: string
}

export interface EditSubcommentParams {
    id: number
    comment: string
}

export default subcomment