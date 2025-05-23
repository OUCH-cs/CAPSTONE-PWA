type Sort = "Recommended" | "Distance";

// NEW

interface NearbyPlacesResponse {
  address: string;
  distance: number;
  lat: number;
  lng: number;
  name: string;
  tel: string;
  ykiho: string;
}

export type { Sort, NearbyPlacesResponse };
