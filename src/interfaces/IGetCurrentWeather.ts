import { unitsType } from "@/types";

export interface IGetCurrentWeather {
  lat: string;
  lon: string;
  dt?: string;
  units: unitsType;
}
