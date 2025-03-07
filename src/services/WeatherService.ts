import { container } from "@/di/container";
import { OpenWeather } from "@/integration/open-weather/OpenWeather";
import { IGetCurrentWeather } from "@/interfaces/IGetCurrentWeather";
import { IWeatherByCityName } from "@/interfaces/IWeatherByCityName";
import { injectable } from "inversify";

@injectable()
export class WeatherService {
  private openWeather = container.get(OpenWeather);

  public async getCurrentWeather(
    payload: IGetCurrentWeather
  ): Promise<{ weather: any }> {
    const { success, content, message } =
      await this.openWeather.getCurrentWeather(payload);

    if (!success) throw new Error(message);

    return { weather: content };
  }

  public async weatherByCityName(
    payload: IWeatherByCityName
  ): Promise<{ weather: any }> {
    const { success, content, message } =
      await this.openWeather.weatherByCityName(payload);

    if (!success) throw new Error(message);

    return { weather: content };
  } //

  public async CoordinatesByLocationName(
    location: string
  ): Promise<{ weather: any }> {
    const { success, content, message } =
      await this.openWeather.CoordinatesByLocationName(location);

    if (!success) throw new Error(message);

    return { weather: content };
  }

  public async getHourlyWeather(
    payload: IGetCurrentWeather
  ): Promise<{ weather_list: any }> {
    const { success, content, message } =
      await this.openWeather.getHourlyWeather(payload);

    if (!success) throw new Error(message);

    return { weather_list: content.list };
  }
}
