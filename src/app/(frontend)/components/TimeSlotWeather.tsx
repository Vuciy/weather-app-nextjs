import React from "react";
import IconWedget from "./IconWedget";

interface ITimeSlotWeatherProps {
  time: string;
  weather: number;
  icon: string;
  unit: string;
}
export default function TimeSlotWeather({
  time,
  weather,
  icon,
  unit,
}: ITimeSlotWeatherProps) {
  return (
    <div className="w-26 h-28 bg-gradient-to-b from-purple-600 to-black rounded-2xl p-2 text-white flex flex-col items-center shadow-lg m-2">
      <p className="text-sm font-medium">{time}</p>
      <div className="mt-2">
        <IconWedget
          {...{
            icon: icon,
          }}
        />
      </div>
      <p className="mt-1">
        {weather && Math.round(weather)} °{unit === "metric" ? "C" : "F"}
      </p>
    </div>
  );
}
