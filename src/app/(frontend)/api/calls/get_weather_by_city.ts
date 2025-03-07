import { objectToQueryString } from "@/helpers/object_to_query_string";
import { API } from "../api";

interface IGetWeatherRequest {
  city: string;
  units: string;
  dt: number;
}
export const get_weather_by_city = async (request: IGetWeatherRequest) => {
  return await new API().apiGet({
    endpoint: `api/weather/city${objectToQueryString(request)}`,
  });
};
