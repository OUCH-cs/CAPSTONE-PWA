import { LatLng } from "@/features/map/map.types";

export function getDistanceInMeters(from: LatLng, to: LatLng): number {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371e3; // 지구 반지름 (m)
  const φ1 = toRad(from.latitude);
  const φ2 = toRad(to.latitude);
  const Δφ = toRad(to.latitude - from.latitude);
  const Δλ = toRad(to.longitude - from.longitude);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c); // m 단위로 반올림
}
