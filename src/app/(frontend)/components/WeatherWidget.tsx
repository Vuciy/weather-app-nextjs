import React from "react";
import IconWedget from "./IconWedget";

export default function WeatherWidget({
  weather,
  currentDate,
  unit,
}: {
  weather: any;
  currentDate: string;
  unit: string;
}) {
  return (
    <div className="flex flex-col gap-8 mt-6 bg-gradient-to-r from-purple-600 to-indigo-700 p-6 rounded-lg">
      <div className="text-lg">{weather?.name} 📍 </div>
      <div className="flex justify-center text-4xl font-bold text-center">
        <div className="flex flex-col justify-center">
          <div className="">
            {weather?.main?.temp ? Math.round(weather.main.temp) : ""}°
            {unit === "metric" ? "C" : "F"}{" "}
          </div>
        </div>
        <div className="">
          <IconWedget
            {...{
              icon: weather ? weather?.weather[0].icon : "",
              size: 2,
            }}
          />
        </div>
      </div>
      <div className="text-gray-300 underline">{currentDate}</div>
      <div className="mt-4 flex justify-evenly">
        <div className="flex flex-col gap-2 text-center">
          <div>Humidity</div>
          <div>{weather?.main?.humidity}%</div>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <div>Visibility</div>
          <div>{weather?.visibility}km</div>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <div>Air Pressure</div>
          <div>{weather?.main?.pressure}hPa</div>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <div>Wind</div>
          <div>
            {weather?.wind?.speed}
            {unit === "metric" ? "mp/h" : "km/h"}
          </div>
        </div>
      </div>
    </div>
  );
}
