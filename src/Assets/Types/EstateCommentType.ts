import subcomment from "./EstateSubCommentType"

interface comment {
    comment_owner?: string,
    comment: string,
    estate_id: number,
    comment_type: string,
    id?: number,
    subcomments?: subcomment,
    is_author?: boolean,
    subcomment_count?: number
}

export default comment