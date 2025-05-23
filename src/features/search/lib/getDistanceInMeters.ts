import { LatLng } from "@/shared/types/common";

export function getDistanceInMeters(from: LatLng, to: LatLng): number {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371e3; // 지구 반지름 (m)
  const φ1 = toRad(from.latitude ?? 0);
  const φ2 = toRad(to.latitude ?? 0);
  const Δφ = toRad((to.latitude ?? 0) - (from.latitude ?? 0));
  const Δλ = toRad((to.longitude ?? 0) - (from.longitude ?? 0));

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c); // m 단위로 반올림
}
