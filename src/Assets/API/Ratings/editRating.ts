import instance from "Assets/Axios/axios";
import rating, { RatingResponse } from "Assets/Types/EstateRatingType";

const editRating = (body: rating) => instance.patch<RatingResponse>(`v1/estate_ratings/${body.id}`, body)

export default editRating