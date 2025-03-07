import { injectable } from "inversify";
import * as api from "./OpenWeatherApi";
import { failure } from "@/helpers/responses/failure";
import { success } from "@/helpers/responses/success";
import { IResponse } from "@/interfaces/IResponse";
import { IGetCurrentWeather } from "@/interfaces/IGetCurrentWeather";
import { IWeatherByCityName } from "@/interfaces/IWeatherByCityName";

@injectable()
export class OpenWeather {
  constructor() {}

  public async getCurrentWeather(
    payload: IGetCurrentWeather
  ): Promise<IResponse> {
    try {
      const response = await api.getCurrentWeather(payload);
      if (response?.status !== 200)
        return failure("Failed to get current weather");

      return success("Success", response?.data);
    } catch (error) {
      return failure("Failed to get current weather", error);
    }
  }

  public async weatherByCityName(
    payload: IWeatherByCityName
  ): Promise<IResponse> {
    try {
      const response = await api.weatherByCityName(payload);

      if (response?.status !== 200)
        return failure("Failed to get current weather");

      return success("Success", response?.data);
    } catch (error) {
      return failure("Failed to get current weather", error);
    }
  }

  public async CoordinatesByLocationName(location: string): Promise<IResponse> {
    try {
      const response = await api.CoordinatesByLocationName(location);
      if (response?.status !== 200)
        return failure("Failed to get current weather");

      return success("Success", response?.data);
    } catch (error) {
      return failure("Failed to get current weather", error);
    }
  }

  public async getHourlyWeather(
    payload: IGetCurrentWeather
  ): Promise<IResponse> {
    try {
      const response = await api.getHourlyWeather(payload);
      if (response?.status !== 200)
        return failure("Failed to get daily weather");

      return success("Success", response?.data);
    } catch (error) {
      return failure("Failed to get daily weather", error);
    }
  }
}
