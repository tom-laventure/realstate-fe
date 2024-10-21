import instance from "Assets/Axios/axios";
import rating from "Assets/Types/EstateRatingType";

interface EditRatingResponse {
    estate_ratings: rating[],
    user_rating: rating
}


const editRating = (body: rating) => instance.patch<EditRatingResponse>(`v1/estate_ratings/${body.id}`, body)

export { EditRatingResponse }
export default editRating