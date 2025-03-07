import React from "react";

interface IDaySelectorWedgetProps {
  onClick: () => void;
  day: {
    day: string;
    unix: number;
  };
  selectedDay: string;
}
export default function DaySelectorWedget({
  selectedDay,
  day,
  onClick,
}: IDaySelectorWedgetProps) {
  return (
    <span
      className={
        selectedDay === day.day
          ? "text-white font-semibold border-b-2 border-white cursor-pointer"
          : "text-gray-400 cursor-pointer"
      }
      onClick={onClick}
    >
      {day.day}
    </span>
  );
}
