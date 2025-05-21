import axios from "axios";

const searchInstance = axios.create({
  baseURL: import.meta.env.VITE_NEARBY_SEARCH_URL,
  headers: {
    "Content-Type": "application/json",
    // "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    "X-Goog-Api-Key": "AIzaSyBcT70j2lyUM80wX1S8jTCPFCNV4MXJlMU",
  },
});

export default searchInstance;
