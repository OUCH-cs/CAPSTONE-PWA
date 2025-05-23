import apiRequest from "@/shared/api/apiRequest";
import { RecommendRequest } from "../../diagnosis.type";

export const postRecommend = async (data : RecommendRequest)=> {
    return apiRequest({
        url: "/diagnosis-algorithm",
        method: "POST",
        data: data,
    })

}