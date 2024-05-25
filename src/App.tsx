import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { NotFound } from "./components/notfound/NotFound";
import MapPage from "./components/map/MapPage";
import { Pollutants } from "./components/pollutants/Pollutants";
import { TopAqi } from "./components/topAqi/TopAqi";
import { useEffect, useState } from "react";

interface City {
  name: string;
  latitude: number;
  longitude: number;
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

const App: React.FC = () => {
  const TOKEN = process.env.REACT_APP_GOOGLE_API_TOKEN;
  const [topUkraine, setTopUkraine] = useState<AirQualityData[]>([]);

  useEffect(() => {
    const fetchAirQualityData = async (city: City) => {
      try {
        const response = await fetch(
          `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${TOKEN}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              location: {
                latitude: city.latitude,
                longitude: city.longitude,
              },
              extraComputations: [
                "POLLUTANT_CONCENTRATION",
                "LOCAL_AQI",
                "POLLUTANT_ADDITIONAL_INFO",
              ],
            }),
          }
        );
        const data = await response.json();
        setTopUkraine((prevData) => [
          ...prevData,
          {
            aqi: data.indexes[0].aqi,
            city: {
              geo: [city.latitude, city.longitude],
              name: city.name,
            },
            iaqi: {
              pm25: { v: data.pollutants[4].concentration.value },
              co: { v: data.pollutants[0].concentration.value },
              no2: { v: data.pollutants[1].concentration.value },
              o3: { v: data.pollutants[2].concentration.value },
              pm10: { v: data.pollutants[3].concentration.value },
              so2: { v: data.pollutants[5].concentration.value },
            },
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const cities = [
      { name: "Вінниця", latitude: 49.2328, longitude: 28.48 },
      { name: "Луцьк", latitude: 50.7472, longitude: 25.3254 },
      { name: "Дніпро", latitude: 48.4647, longitude: 35.0462 },
      { name: "Донецьк", latitude: 48.0159, longitude: 37.8028 },
      { name: "Житомир", latitude: 50.2547, longitude: 28.6587 },
      { name: "Ужгород", latitude: 48.6208, longitude: 22.2879 },
      { name: "Запоріжжя", latitude: 47.8388, longitude: 35.1396 },
      { name: "Івано-Франківськ", latitude: 48.9226, longitude: 24.7103 },
      { name: "Київ", latitude: 50.4501, longitude: 30.5234 },
      { name: "Кропивницький", latitude: 48.5079, longitude: 32.2623 },
      { name: "Луганськ", latitude: 48.574, longitude: 39.3078 },
      { name: "Львів", latitude: 49.8397, longitude: 24.0297 },
      { name: "Миколаїв", latitude: 46.975, longitude: 31.9946 },
      { name: "Одеса", latitude: 46.4825, longitude: 30.7233 },
      { name: "Полтава", latitude: 49.5883, longitude: 34.5514 },
      { name: "Рівне", latitude: 50.6199, longitude: 26.2516 },
      { name: "Суми", latitude: 50.9077, longitude: 34.7981 },
      { name: "Тернопіль", latitude: 49.5535, longitude: 25.5948 },
      { name: "Харків", latitude: 49.9935, longitude: 36.2304 },
      { name: "Херсон", latitude: 46.6354, longitude: 32.6169 },
      { name: "Хмельницький", latitude: 49.4229, longitude: 26.9871 },
      { name: "Черкаси", latitude: 49.4444, longitude: 32.0598 },
      { name: "Чернігів", latitude: 51.4982, longitude: 31.2893 },
      { name: "Чернівці", latitude: 48.2915, longitude: 25.9403 },
      { name: "Сімферополь", latitude: 44.9521, longitude: 34.1024 },
    ];

    cities.forEach((city) => fetchAirQualityData(city));
  }, [TOKEN]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/pollutants" element={<Pollutants />} />
          <Route path="/top" element={<TopAqi topUkraine={topUkraine} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
