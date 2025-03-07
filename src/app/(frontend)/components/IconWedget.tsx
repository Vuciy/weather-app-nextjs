import React from "react";

interface IconWedgetProps {
  icon: string;
  size?: number;
}

export default function IconWedget({ icon, size }: IconWedgetProps) {
  if (size)
    return (
      <img src={`https://openweathermap.org/img/wn/${icon}@${size}x.png`} />
    );
  return <img src={`https://openweathermap.org/img/wn/${icon}.png`} />;
}
