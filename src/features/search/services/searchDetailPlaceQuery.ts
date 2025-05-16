import searchInstance from "./api/searchInstance";

const searchDetailPlaceQuery = async (url: string) => {
  const response = await searchInstance({
    url,
    method: "GET",
    params: {
      languageCode: "en",
    },
    headers: {
      "X-Goog-FieldMask":
        "id,displayName,formattedAddress,location,primaryType,primaryTypeDisplayName,nationalPhoneNumber,location",
    },
  });

  return response.data;
};

export { searchDetailPlaceQuery };
