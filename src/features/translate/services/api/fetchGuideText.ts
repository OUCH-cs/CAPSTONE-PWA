import apiRequest from "@/shared/api/apiRequest";

const fetchGudieText = async (url: string) => {
  const { data } = await apiRequest({
    url,
    method: "GET",
  });

  return data;
};

export { fetchGudieText };
