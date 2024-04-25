import React, { useEffect } from "react";
import c from "./PollutionInfo.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setData } from "../../../redux/actions/dataActions";
import { Option } from "./Option/Option";
import ReactSpeedometer, {
  CustomSegmentLabelPosition,
  Transition,
} from "react-d3-speedometer";

export const PollutionInfo: React.FC = () => {
  const TOKEN = process.env.REACT_APP_WAQI_API_TOKEN;
  const coord = useSelector((state: any) => state.coord);
  const dispatch = useDispatch();
  const pollutionData = useSelector((state: any) => state.data);

  useEffect(() => {
    console.log(pollutionData);
  }, [pollutionData]);

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

  return (
    <aside className={c.cont}>
      <h3 className={c.title}>Стан повітря</h3>
      <h4 className={c.city}>{pollutionData?.data?.city?.name}</h4>
      <div className={c.speedCont}>
        <ReactSpeedometer
          width={400}
          needleHeightRatio={0.8}
          value={pollutionData?.data?.aqi}
          customSegmentStops={[0, 50, 100, 150, 200, 300, 500]}
          minValue={0}
          maxValue={500}
          segmentColors={[
            "#009966",
            "#ffde33",
            "#ff9933",
            "#cc0033",
            "#660099",
            "#7e0023",
          ]}
          currentValueText={`AQI: ${pollutionData?.data?.aqi}`}
          needleTransitionDuration={3333}
          needleTransition={Transition.easeElastic}
          needleColor={"#a7ff83"}
          textColor={"#d8dee9"}
        />
      </div>
      {pollutionData?.data?.iaqi?.pm10?.v && (
        <Option title="PM10" value={pollutionData.data.iaqi.pm10.v} />
      )}
      {pollutionData?.data?.iaqi?.pm25?.v && (
        <Option title="PM25" value={pollutionData.data.iaqi.pm25.v} />
      )}
      {pollutionData?.data?.iaqi?.no2?.v && (
        <Option title="NO2" value={pollutionData.data.iaqi.no2.v} />
      )}
      {pollutionData?.data?.iaqi?.o3?.v && (
        <Option title="O3" value={pollutionData.data.iaqi.o3.v} />
      )}
      {pollutionData?.data?.iaqi?.so2?.v && (
        <Option title="SO2" value={pollutionData.data.iaqi.so2.v} />
      )}
    </aside>
  );
};
