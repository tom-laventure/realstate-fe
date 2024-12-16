import instance from "Assets/Axios/axios";

const deleteEstate = (id: number) => instance.delete(`/v1/estates/${id}`)

export default deleteEstate