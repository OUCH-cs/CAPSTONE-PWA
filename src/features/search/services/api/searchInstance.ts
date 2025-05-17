import axios from "axios";

const searchInstance = axios.create({
  baseURL: import.meta.env.VITE_NEARBY_SEARCH_URL,
  headers: {
    "Content-Type": "application/json",
    // "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  },
});

export default searchInstance;
