import apiRequest from "@/shared/api/apiRequest";

interface Symptom {
    id: number;
    name: string;
  }

export const getSymptoms = async () : Promise<Symptom[]> => {
    const response = await apiRequest({
        url: "/symptoms",
        method: "GET"
    })
    return response.data.data;
}