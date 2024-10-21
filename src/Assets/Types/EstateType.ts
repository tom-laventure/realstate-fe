import comment from "./EstateCommentType"
import rating from "./EstateRatingType"

interface estate {
    header: string,
    link: string,
    estate_ratings: rating[]
    estate_comments?: comment[],
    id: number,
    user_rating?: rating
}

export default estate