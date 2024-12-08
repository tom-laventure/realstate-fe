import comment from "./EstateCommentType"
import rating from "./EstateRatingType"

interface estate {
    header: string,
    link: string,
    estate_ratings: rating[]
    estate_comments?: comment[],
    id: number,
    user_rating?: rating,
    image: string
}

interface estateMetaData {
    image: string,
    price: string,
    header: string
}

export { estateMetaData }
export default estate