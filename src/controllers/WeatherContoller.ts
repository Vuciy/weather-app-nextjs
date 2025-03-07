import { container } from "@/di/container";
import { failure } from "@/helpers/responses/failure";
import { success } from "@/helpers/responses/success";
import { IGetCurrentWeather } from "@/interfaces/IGetCurrentWeather";
import { WeatherService } from "@/services/WeatherService";
import { unitsType } from "@/types";
import { injectable } from "inversify";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

@injectable()
export class WeatherContoller {
  private weatherService = container.get(WeatherService); //getHourlyWeather

  constructor() {}

  public async getCurrentWeather(req: NextRequest): Promise<NextResponse<any>> {
    const lat = req.nextUrl.searchParams.get("lat");
    const lon = req.nextUrl.searchParams.get("lon");
    const units = req.nextUrl.searchParams.get("units");
    const dt = req.nextUrl.searchParams.get("dt");
    try {
      const { weather } = await this.weatherService.getCurrentWeather({
        lat: `${lat}`,
        lon: `${lon}`,
        units: `${units}` as unitsType,
        dt: `${dt}`,
      });
      return NextResponse.json(
        success("Successfuly retrieved weather", weather),
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(failure("Failed to get weather", error), {
        status: 500,
      });
    }
  }

  public async getHourlyWeather(req: NextRequest): Promise<NextResponse<any>> {
    const lat = req.nextUrl.searchParams.get("lat");
    const lon = req.nextUrl.searchParams.get("lon");
    const units = req.nextUrl.searchParams.get("units");
    try {
      const { weather_list } = await this.weatherService.getHourlyWeather({
        lat: `${lat}`,
        lon: `${lon}`,
        units: `${units}` as unitsType,
      });
      return NextResponse.json(
        success("Successfuly retrieved weather", weather_list),
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(failure("Failed to get weather", error), {
        status: 500,
      });
    }
  }

  public async weatherByCityName(req: NextRequest): Promise<NextResponse<any>> {
    const city = req.nextUrl.searchParams.get("city");
    const units = req.nextUrl.searchParams.get("units");
    const dt = req.nextUrl.searchParams.get("dt");
    try {
      const { weather } = await this.weatherService.weatherByCityName({
        city: `${city}`,
        units: `${units}` as unitsType,
        dt: `${dt}`,
      });
      return NextResponse.json(
        success("Successfuly retrieved weather", weather),
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(failure("Failed to get weather", error), {
        status: 500,
      });
    }
  }
}
