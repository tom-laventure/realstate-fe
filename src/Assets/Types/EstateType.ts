import comment from "./EstateCommentType"
import rating from "./EstateRatingType"

interface estate {
    header: string,
    link: string,
    ratings?: rating[]
    comments?: comment[],
    id: number
}

export default estate