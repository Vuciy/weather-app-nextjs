"use client";

import { getUserLocation } from "@/helpers/getLocation";
import TimeSlotWeather from "./components/TimeSlotWeather";
import WeatherWidget from "./components/WeatherWidget";
import { useEffect, useState } from "react";
import { ICoordinates } from "@/interfaces/ICoordinates";
import { get_weather } from "./api/calls/get_weather";
import moment from "moment";
import { debounce } from "@/helpers/debounce";
import { get_weather_by_city } from "./api/calls/get_weather_by_city";
import DaySelectorWedget from "./components/DaySelectorWedget";
import { DAYS } from "../constant/constant";
import ToggleWedget from "./components/ToggleWedget";
import { get_daily_weather } from "./api/calls/get_daily_weather";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);
  const [dailyWeather, setDailyWeather] = useState<any[]>([]);
  const [unit, setUnit] = useState("metric");
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [favoritesCities, setFavoritesCities] = useState<any[]>([]);
  const [city, setCity] = useState(null);
  const [citySaved, setCitySaved] = useState(false);

  let currentDate = moment().format("MMM DD, ddd");
  let currentTime = moment().format("HH:MM");

  useEffect(() => {
    getUserLocation((cord: ICoordinates) => {
      getCurrentWeather(cord);
      getDailyWeather(cord);
    });
  }, [unit, selectedDay]);

  useEffect(() => {
    const savedFavoritesString = localStorage?.getItem("favoriteSearches");
    if (savedFavoritesString) {
      const savedFavorites = JSON.parse(savedFavoritesString);
      setFavoritesCities(savedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteSearches", JSON.stringify(favoritesCities));
  }, [favoritesCities]);

  const addFavoriteCity = () => {
    if (city && !favoritesCities.map((x: any) => x.name).includes(city)) {
      setFavoritesCities([...favoritesCities, city]);
      setCity(null);
    }
  };

  const removeFavorite = () => {
    const updatedFavorites = favoritesCities.filter(
      (fav) => fav?.name !== weather?.name
    );
    setFavoritesCities(updatedFavorites);
    setCitySaved(false);
  };

  const debouncedChange = debounce(async (inputValue: string) => {
    if (inputValue) {
      const city = favoritesCities.find((x) => x.name.includes(inputValue));

      if (city) {
        setCitySaved(true);
        setWeather(city);
        return;
      }
      const { success, content, message } = await get_weather_by_city({
        city: inputValue,
        units: unit,
        dt: selectedDay?.unix,
      });

      if (!success) {
        alert(message);
        return;
      }

      setCity(content);
      setWeather(content);
    }
  }, 1000);

  const getCurrentWeather = async (cord: ICoordinates) => {
    const { success, content, message } = await get_weather({
      lat: cord?.latitude,
      lon: cord.longitude,
      units: unit,
      dt: selectedDay?.unix,
    });

    if (!success) {
      alert(message);
      return;
    }
    setWeather(content);
  };

  const getDailyWeather = async (cord: ICoordinates) => {
    const { success, content, message } = await get_daily_weather({
      lat: cord?.latitude,
      lon: cord.longitude,
      units: unit,
    });

    if (!success) {
      alert(message);
      return;
    }
    setDailyWeather(content);
  };
  return (
    <div className="max-w-4xl mx-auto p-5 h-screen">
      <header className="">
        <h1 className="text-2xl font-bold flex items-center">
          <span className="mr-2">☁️</span> WeatherMe
        </h1>
        <p className="text-gray-400">{currentTime}</p>
      </header>

      <nav className="flex justify-end space-x-6 mt-4 border-b border-gray-700 pb-2">
        {DAYS.map((day, i) => (
          <div key={i}>
            <DaySelectorWedget
              {...{
                onClick: () => {
                  setSelectedDay(day);
                },
                selectedDay: selectedDay.day,
                day: day,
              }}
            />
          </div>
        ))}
      </nav>

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-2">
          <span>°C</span>
          <ToggleWedget
            onChange={() => {
              setUnit(unit === "metric" ? "imperial" : "metric");
            }}
          />
          <span>°F</span>
        </div>
      </div>

      <div className="mt-4 flex justify-center relative">
        {city && (
          <span
            onClick={() => {
              addFavoriteCity();
              setCitySaved(true);
              alert("City saved");
            }}
            className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full absolute cursor-pointer top-3 text-right right-56"
          >
            Save
          </span>
        )}

        {citySaved && (
          <span
            onClick={() => {
              removeFavorite();
              alert("City Removed");
            }}
            className="bg-green-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full absolute cursor-pointer top-3 text-right right-56"
          >
            Remove
          </span>
        )}

        <input
          type="text"
          placeholder="Search location..."
          className="w-1/2 p-2 rounded-lg bg-white text-gray-800"
          onChange={(e) => {
            debouncedChange(e?.target?.value);
          }}
        />
      </div>

      <WeatherWidget
        {...{
          weather,
          currentDate: currentDate,
          unit,
        }}
      />

      <div className="mt-6 flex justify-evenly overflow-x-auto overflow-y-hidden">
        {dailyWeather.map((x) => (
          <div className="">
            <TimeSlotWeather
              {...{
                icon: x?.weather[0]?.icon,
                time: moment.unix(x?.dt).format("HH:MM"),
                weather: x?.main?.temp,
                unit,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
