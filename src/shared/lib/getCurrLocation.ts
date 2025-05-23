import { LatLng } from "../types/common";

const getCurrLocation = (): Promise<LatLng> => {
  return new Promise((resolve, reject) => {
    // 브라우저가 geolocation을 지원하는지 확인
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }
    // geolocation API를 사용하여 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log("성공 위치:", position.coords);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        // console.log("실패 사유:", error);
        reject(error);
      }
    );
  });
};

export { getCurrLocation };
