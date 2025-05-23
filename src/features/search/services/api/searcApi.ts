import apiRequest from "@/shared/api/apiRequest";
import { LatLng } from "@/shared/types/common";

export const fetchNearbySearch = async (
  url: string,
  currLocation: LatLng,
  size = 20
) => {
  const res = await apiRequest({
    url,
    params: {
      lat: currLocation.latitude!.toString(),
      lng: currLocation.longitude!.toString(),
      size: size.toString(),
    },
  });

  return res.data;
};
