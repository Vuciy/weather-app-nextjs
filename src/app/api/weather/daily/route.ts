import { WeatherContoller } from "@/controllers/WeatherContoller";
import { failure } from "@/helpers/responses/failure";
import { NextRequest, NextResponse } from "next/server";

const weatherContoller = new WeatherContoller();
export async function GET(req: NextRequest) {
  try {
    return await weatherContoller.getHourlyWeather(req);
  } catch (error: any) {
    return NextResponse.json(failure("Failed to get weather", error), {
      status: 500,
    });
  }
}
