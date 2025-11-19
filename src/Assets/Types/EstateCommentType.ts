import subcomment from "./EstateSubCommentType"

interface comment {
    comment_owner?: string,
    comment: string,
    estate_id: number,
    comment_type: string,
    id?: number,
    subcomments?: subcomment,
    is_author?: boolean,
    subcomment_count?: number,
    created_at: string,
    updated_at: string
}

type commentMetaData = Omit<comment, 'created_at' | 'updated_at'> 

export { commentMetaData }
export default comment