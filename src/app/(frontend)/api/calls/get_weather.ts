import { objectToQueryString } from "@/helpers/object_to_query_string";
import { API } from "../api";

interface IGetWeatherRequest {
  lat: number;
  lon: number;
  units: string;
  dt: number;
}
export const get_weather = async (request: IGetWeatherRequest) => {
  return await new API().apiGet({
    endpoint: `api/weather${objectToQueryString(request)}`,
  });
};
