import { unitsType } from "@/types";

export interface IWeatherByCityName {
  city: string;
  dt?: string;
  units: unitsType;
}
