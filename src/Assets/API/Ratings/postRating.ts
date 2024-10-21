import instance from "Assets/Axios/axios";
import rating from "Assets/Types/EstateRatingType";

interface PostRatingResponse {
    estate_ratings: rating[],
    user_rating: rating
}


const postRating = (body: rating) => instance.post<PostRatingResponse>(`v1/estate_ratings`, body)

export default postRating