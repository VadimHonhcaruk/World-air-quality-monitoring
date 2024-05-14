interface AQIRange {
  aqiLow: number;
  aqiHigh: number;
  concLow: number;
  concHigh: number;
}

const pm25Breakpoints: AQIRange[] = [
  { aqiLow: 0, aqiHigh: 50, concLow: 0.0, concHigh: 12.0 },
  { aqiLow: 51, aqiHigh: 100, concLow: 12.1, concHigh: 35.4 },
  { aqiLow: 101, aqiHigh: 150, concLow: 35.5, concHigh: 55.4 },
  { aqiLow: 151, aqiHigh: 200, concLow: 55.5, concHigh: 150.4 },
  { aqiLow: 201, aqiHigh: 300, concLow: 150.5, concHigh: 250.4 },
  { aqiLow: 301, aqiHigh: 400, concLow: 250.5, concHigh: 350.4 },
  { aqiLow: 401, aqiHigh: 500, concLow: 350.5, concHigh: 500.4 },
];

const pm10Breakpoints: AQIRange[] = [
  { aqiLow: 0, aqiHigh: 50, concLow: 0, concHigh: 54 },
  { aqiLow: 51, aqiHigh: 100, concLow: 55, concHigh: 154 },
  { aqiLow: 101, aqiHigh: 150, concLow: 155, concHigh: 254 },
  { aqiLow: 151, aqiHigh: 200, concLow: 255, concHigh: 354 },
  { aqiLow: 201, aqiHigh: 300, concLow: 355, concHigh: 424 },
  { aqiLow: 301, aqiHigh: 400, concLow: 425, concHigh: 504 },
  { aqiLow: 401, aqiHigh: 500, concLow: 505, concHigh: 604 },
];

const coBreakpoints: AQIRange[] = [
  { aqiLow: 0, aqiHigh: 50, concLow: 0.0, concHigh: 4.4 },
  { aqiLow: 51, aqiHigh: 100, concLow: 4.5, concHigh: 9.4 },
  { aqiLow: 101, aqiHigh: 150, concLow: 9.5, concHigh: 12.4 },
  { aqiLow: 151, aqiHigh: 200, concLow: 12.5, concHigh: 15.4 },
  { aqiLow: 201, aqiHigh: 300, concLow: 15.5, concHigh: 30.4 },
  { aqiLow: 301, aqiHigh: 400, concLow: 30.5, concHigh: 40.4 },
  { aqiLow: 401, aqiHigh: 500, concLow: 40.5, concHigh: 50.4 },
];

const no2Breakpoints: AQIRange[] = [
  { aqiLow: 0, aqiHigh: 50, concLow: 0, concHigh: 53 },
  { aqiLow: 51, aqiHigh: 100, concLow: 54, concHigh: 100 },
  { aqiLow: 101, aqiHigh: 150, concLow: 101, concHigh: 360 },
  { aqiLow: 151, aqiHigh: 200, concLow: 361, concHigh: 649 },
  { aqiLow: 201, aqiHigh: 300, concLow: 650, concHigh: 1249 },
  { aqiLow: 301, aqiHigh: 400, concLow: 1250, concHigh: 1649 },
  { aqiLow: 401, aqiHigh: 500, concLow: 1650, concHigh: 2049 },
];

const o3Breakpoints: AQIRange[] = [
  { aqiLow: 0, aqiHigh: 50, concLow: 0, concHigh: 54 },
  { aqiLow: 51, aqiHigh: 100, concLow: 55, concHigh: 70 },
  { aqiLow: 101, aqiHigh: 150, concLow: 71, concHigh: 85 },
  { aqiLow: 151, aqiHigh: 200, concLow: 86, concHigh: 105 },
  { aqiLow: 201, aqiHigh: 300, concLow: 106, concHigh: 200 },
  { aqiLow: 301, aqiHigh: 400, concLow: 201, concHigh: 300 },
  { aqiLow: 401, aqiHigh: 500, concLow: 301, concHigh: 400 },
];

const so2Breakpoints: AQIRange[] = [
  { aqiLow: 0, aqiHigh: 50, concLow: 0, concHigh: 35 },
  { aqiLow: 51, aqiHigh: 100, concLow: 36, concHigh: 75 },
  { aqiLow: 101, aqiHigh: 150, concLow: 76, concHigh: 185 },
  { aqiLow: 151, aqiHigh: 200, concLow: 186, concHigh: 304 },
  { aqiLow: 201, aqiHigh: 300, concLow: 305, concHigh: 604 },
  { aqiLow: 301, aqiHigh: 400, concLow: 605, concHigh: 804 },
  { aqiLow: 401, aqiHigh: 500, concLow: 805, concHigh: 1004 },
];

const convertAqiToConcentration = (
  aqi: number,
  breakpoints: AQIRange[]
): number => {
  const range = breakpoints.find(
    (range) => aqi >= range.aqiLow && aqi <= range.aqiHigh
  );
  if (!range) throw new Error("AQI out of range");
  return (
    ((aqi - range.aqiLow) * (range.concHigh - range.concLow)) /
      (range.aqiHigh - range.aqiLow) +
    range.concLow
  );
};

export const AQItoConc = (pollutant: string, aqiValue: number) => {
  let concentration;
  console.log(pollutant, aqiValue);
  switch (pollutant) {
    case "PM2.5":
      concentration = convertAqiToConcentration(aqiValue, pm25Breakpoints);
      break;
    case "PM10":
      concentration = convertAqiToConcentration(aqiValue, pm10Breakpoints);
      break;
    case "CO":
      concentration = convertAqiToConcentration(aqiValue, coBreakpoints);
      break;
    case "NO2":
      concentration = convertAqiToConcentration(aqiValue, no2Breakpoints);
      break;
    case "O3":
      concentration = convertAqiToConcentration(aqiValue, o3Breakpoints);
      break;
    case "SO2":
      concentration = convertAqiToConcentration(aqiValue, so2Breakpoints);
      break;
    default:
      throw new Error("Unknown pollutant");
  }

  return parseFloat(concentration.toFixed(1));
};
