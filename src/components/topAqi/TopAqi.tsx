import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTOP } from "../../redux/actions";

export const TopAqi: React.FC = () => {
  const dispatch = useDispatch();
  const topData = useSelector((state: any) => state.top);
  const TOKEN = "fce1c760-c5cc-4c81-b142-bec279c50b8e";

  useEffect(() => {
    const fetchTopCitiesPollution = async () => {
      try {
        const response = await axios.get(
          "https://api.airvisual.com/v2/top-cities",
          {
            params: {
              key: TOKEN,
            },
          }
        );
        const topCities = response.data.data;
        return topCities;
      } catch (error) {
        console.error("Error fetching top cities pollution data:", error);
        return null;
      }
    };
    fetchTopCitiesPollution().then((data) => {
      if (data) {
        console.log("Top cities pollution data:", data);
      } else {
        console.log("Failed to fetch top cities pollution data");
      }
    });
  }, [dispatch]);

  return <div></div>;
};
