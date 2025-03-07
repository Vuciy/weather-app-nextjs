import { ICoordinates } from "@/interfaces/ICoordinates";

export const getUserLocation = (
  callback: (coordinates: ICoordinates) => void
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        callback(position.coords);
      },
      (error) => {
        alert(error?.message);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};
