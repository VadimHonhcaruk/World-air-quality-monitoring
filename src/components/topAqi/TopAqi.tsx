import React, { useState } from "react";
import c from "./TopAqi.module.css";

interface TopAqiProps {
  topUkraine: AirQualityData[];
}

interface AirQualityData {
  aqi: number;
  city: {
    geo: [number, number];
    name: string;
  };
  iaqi: {
    pm25: { v: number };
    co: { v: number };
    no2: { v: number };
    o3: { v: number };
    pm10: { v: number };
    so2: { v: number };
  };
}

type SortKey =
  | keyof AirQualityData
  | "cityName"
  | "pm25"
  | "co"
  | "no2"
  | "o3"
  | "pm10"
  | "so2";
type SortOrder = "asc" | "desc";

export const TopAqi: React.FC<TopAqiProps> = ({ topUkraine }) => {
  const [sortKey, setSortKey] = useState<SortKey>("aqi");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  topUkraine = topUkraine.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.city.name === value.city.name)
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedTopUkraine = [...topUkraine].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortKey) {
      case "cityName":
        aValue = a.city.name;
        bValue = b.city.name;
        break;
      case "pm25":
      case "co":
      case "no2":
      case "o3":
      case "pm10":
      case "so2":
        aValue = a.iaqi[sortKey]?.v ?? 0;
        bValue = b.iaqi[sortKey]?.v ?? 0;
        break;
      case "aqi":
      default:
        aValue = a[sortKey];
        bValue = b[sortKey];
        break;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  return (
    <div className={c.top}>
      <div>
        <table className={c.table}>
          <thead>
            <tr className={c.tr}>
              <th className={c.th} onClick={() => handleSort("cityName")}>
                Назва міста
              </th>
              <th className={c.th} onClick={() => handleSort("aqi")}>
                AQI
              </th>
              <th className={c.th} onClick={() => handleSort("co")}>
                CO
              </th>
              <th className={c.th} onClick={() => handleSort("no2")}>
                NO2
              </th>
              <th className={c.th} onClick={() => handleSort("o3")}>
                O3
              </th>
              <th className={c.th} onClick={() => handleSort("pm25")}>
                PM2.5
              </th>
              <th className={c.th} onClick={() => handleSort("pm10")}>
                PM10
              </th>
              <th className={c.th} onClick={() => handleSort("so2")}>
                SO2
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTopUkraine.map((cityData, index) => (
              <tr className={c.tr} key={index}>
                <td className={c.td + " " + c.nameCity}>
                  {cityData.city.name}
                </td>
                <td className={c.td}>{cityData.aqi}</td>
                <td className={c.td}>{cityData.iaqi.co.v}</td>
                <td className={c.td}>{cityData.iaqi.no2.v}</td>
                <td className={c.td}>{cityData.iaqi.o3.v}</td>
                <td className={c.td}>{cityData.iaqi.pm25.v}</td>
                <td className={c.td}>{cityData.iaqi.pm10.v}</td>
                <td className={c.td}>{cityData.iaqi.so2.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
