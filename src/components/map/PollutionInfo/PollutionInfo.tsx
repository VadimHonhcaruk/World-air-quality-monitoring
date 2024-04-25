import React, { useEffect } from "react";
import c from "./PollutionInfo.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setData } from "../../../redux/actions/dataActions";

export const PollutionInfo: React.FC = () => {
  const TOKEN = process.env.REACT_APP_WAQI_API_TOKEN;
  const coord = useSelector((state: any) => state.coord);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.waqi.info/feed/geo:${coord.coord[0]};${coord.coord[1]}/?token=${TOKEN}`
        );
        dispatch(setData(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, coord, TOKEN]);

  return (
    <aside className={c.cont}>
      <h3 className={c.title}>Стан повітря</h3>
    </aside>
  );
};
