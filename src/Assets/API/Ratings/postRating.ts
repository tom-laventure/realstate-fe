import instance from "Assets/Axios/axios";
import rating, { RatingResponse } from "Assets/Types/EstateRatingType";


const postRating = (body: rating) => instance.post<RatingResponse>(`v1/estate_ratings`, body)

export default postRating