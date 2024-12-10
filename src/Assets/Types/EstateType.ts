import comment from "./EstateCommentType"
import rating from "./EstateRatingType"

interface estate {
    header: string,
    link: string,
    estate_ratings: rating[]
    estate_comments?: comment[],
    id: number,
    user_rating?: rating,
    image: string,
    price?: string
}

type estateMetaData = Omit<estate, 'estate_ratings' | 'link' | 'id'>

export { estateMetaData }
export default estate