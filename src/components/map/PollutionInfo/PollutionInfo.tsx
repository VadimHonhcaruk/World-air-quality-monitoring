import React, { useEffect, useState } from "react";
import c from "./PollutionInfo.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setData } from "../../../redux/actions/dataActions";
import { Option } from "./Option/Option";
import ReactSpeedometer, { Transition } from "react-d3-speedometer";
import { ColorInfo } from "./ColorInfo/ColorInfo";
import { getDistance } from "geolib";
import { AQItoConc } from "../../../utils/AQItoConc";

export const PollutionInfo: React.FC = () => {
  const TOKEN = process.env.REACT_APP_WAQI_API_TOKEN;
  const coord = useSelector((state: any) => state.coord);
  const dispatch = useDispatch();
  const pollutionData = useSelector((state: any) => state.data);
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.waqi.info/feed/geo:${coord.coord[0]};${coord.coord[1]}/?token=${TOKEN}`
        );
        dispatch(setData(response.data.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, coord, TOKEN]);

  useEffect(() => {
    if (pollutionData.data && coord.coord[0]) {
      const point1 = { latitude: coord.coord[0], longitude: coord.coord[1] };
      const point2 = {
        latitude: pollutionData?.data?.city?.geo[0],
        longitude: pollutionData?.data?.city?.geo[1],
      };
      setDistance(getDistance(point1, point2));
    }
  }, [pollutionData]);

  return pollutionData?.data?.aqi ? (
    <aside className={c.cont}>
      <h3 className={c.title}>Стан повітря</h3>
      <div className={c.dist}>
        Дистанція до найближчої точки моніторингу:{" "}
        <strong className={c.strongDis}>
          {(distance / 1000).toFixed(0)}км
        </strong>
      </div>
      <h4 className={c.city}>{pollutionData?.data?.city?.name}</h4>
      <div className={c.speedCont}>
        <ReactSpeedometer
          width={400}
          needleHeightRatio={0.8}
          value={
            pollutionData?.data?.aqi > 500 ? 500 : pollutionData?.data?.aqi
          }
          customSegmentStops={[0, 50, 100, 150, 200, 300, 500]}
          minValue={0}
          maxValue={500}
          segmentColors={[
            "#009966",
            "#ffde33",
            "#ff9933",
            "#cc0033",
            "#7e0023",
            "#660099",
          ]}
          currentValueText={`AQI: ${pollutionData?.data?.aqi}`}
          needleTransitionDuration={3333}
          needleTransition={Transition.easeElastic}
          needleColor={"#a7ff83"}
          textColor={"#d8dee9"}
        />
      </div>
      {pollutionData?.data?.iaqi?.pm10?.v && (
        <Option
          title="PM10"
          value={AQItoConc("PM10", pollutionData.data.iaqi.pm10.v)}
        />
      )}
      {pollutionData?.data?.iaqi?.pm25?.v && (
        <Option
          title="PM2.5"
          value={AQItoConc("PM2.5", pollutionData.data.iaqi.pm25.v)}
        />
      )}
      {pollutionData?.data?.iaqi?.co?.v && (
        <Option
          title="CO"
          value={AQItoConc("CO", pollutionData.data.iaqi.co.v)}
        />
      )}
      {pollutionData?.data?.iaqi?.no2?.v && (
        <Option
          title="NO2"
          value={AQItoConc("NO2", pollutionData.data.iaqi.no2.v)}
        />
      )}
      {pollutionData?.data?.iaqi?.o3?.v && (
        <Option
          title="O3"
          value={AQItoConc("O3", pollutionData.data.iaqi.o3.v)}
        />
      )}
      {pollutionData?.data?.iaqi?.so2?.v && (
        <Option
          title="SO2"
          value={AQItoConc("SO2", pollutionData.data.iaqi.so2.v)}
        />
      )}
    </aside>
  ) : (
    <aside className={c.cont}>
      <h3 className={c.title}>Інформація</h3>
      <p className={c.start}>
        Для початку роботи - оберіть будь-яке місце на карті, натиснувши на
        нього.
      </p>
      <p className={c.start}>
        Якщо в обраній точці немає інформації про забруднення - ви отримуєте
        дані найближчої точки.
      </p>
      <p className={c.start}>Рівні забруднення повітря за показником AQI:</p>
      <div className={c.infoFlex}>
        <ColorInfo range="0-50" color="#009966" title="Добрий" />
        <ColorInfo range="51-100" color="#ffde33" title="Помірний" />
        <ColorInfo
          range="101-150"
          color="#ff9933"
          title="Нездоровий для чутливих груп"
        />
        <ColorInfo range="151-200" color="#cc0033" title="Нездоровий" />
        <ColorInfo range="201-300" color="#7e0023" title="Дуже нездоровий" />
        <ColorInfo range="300+" color="#660099" title="Небезпечний" />
      </div>
    </aside>
  );
};
