import { IGetCurrentWeather } from "@/interfaces/IGetCurrentWeather";
import { IWeatherByCityName } from "@/interfaces/IWeatherByCityName";
import axios from "axios";

const headers = (moreHeaders = {}) => {
  return {
    "Content-Type": "application/json",
    ...moreHeaders,
  };
};
export const getCurrentWeather = ({
  lat,
  lon,
  units = "standard",
}: IGetCurrentWeather) => {
  const api = axios.create({
    baseURL: process.env.OPEN_WEATHER_URL,
    headers: headers(),
  });

  return api.get(
    `/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );
};

export const weatherByCityName = ({ city, units }: IWeatherByCityName) => {
  const api = axios.create({
    baseURL: process.env.OPEN_WEATHER_URL,
    headers: headers(),
  });

  return api.get(
    `/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );
};

export const getHourlyWeather = ({
  lat,
  lon,
  city,
  units = "standard",
}: IGetCurrentWeather) => {
  const api = axios.create({
    baseURL: process.env.OPEN_WEATHER_URL,
    headers: headers(),
  });

  return api.get(
    `/data/2.5/forecast?lat=${lat}&q=${city}&lon=${lon}&units=${units}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );
};

export const CoordinatesByLocationName = (location: string) => {
  const api = axios.create({
    baseURL: process.env.OPEN_WEATHER_URL,
    headers: headers(),
  });

  return api.get(
    `/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );
};
