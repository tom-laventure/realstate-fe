interface rating {
    rating_owner?: string,
    rating_owner_id?: number,
    rating: string,
    id?: number
}

interface RatingResponse {
    estate_ratings: rating[],
    user_rating: rating
}

export { RatingResponse }
export default rating