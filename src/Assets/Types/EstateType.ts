import comment from "./EstateCommentType"
import rating from "./EstateRatingType"

interface estate {
    header: string,
    link: string,
    ratings?: rating[]
    comments?: comment[]
}

export default estate