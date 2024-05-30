interface Pollutant {
  v: number;
}

interface IAQI {
  pm25?: Pollutant;
  no2?: Pollutant;
  o3?: Pollutant;
}

export const calculateAQHI = (iaqi: IAQI): number => {
  const PM25 = iaqi.pm25?.v || 0;
  const NO2 = iaqi.no2?.v || 0;
  const O3 = iaqi.o3?.v || 0;

  const betaO3 = 0.000537;
  const betaNO2 = 0.000871;
  const betaPM25 = 0.000487;

  const O3Component = O3 ? Math.exp(betaO3 * O3) - 1 : 0;
  const NO2Component = NO2 ? Math.exp(betaNO2 * NO2) - 1 : 0;
  const PM25Component = PM25 ? Math.exp(betaPM25 * PM25) - 1 : 0;

  const AQHI = (1000 / 10.4) * (O3Component + NO2Component + PM25Component);

  return AQHI;
};
