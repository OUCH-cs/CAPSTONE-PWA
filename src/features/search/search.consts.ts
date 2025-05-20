const fieldMaskMap: Record<string, string> = {
  ":searchNearby":
    "places.displayName,places.id,places.currentOpeningHours.openNow,places.currentOpeningHours.weekdayDescriptions,places.rating,places.primaryTypeDisplayName,places.types,places.location",
  ":searchText":
    "places.displayName,places.id,places.currentOpeningHours.openNow,places.currentOpeningHours.weekdayDescriptions,places.rating,places.primaryTypeDisplayName,places.types,places.location",
};

export { fieldMaskMap };
