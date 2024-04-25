import React from "react";
import GoogleMapCont from "./GoogleMap/GoogleMap";
import { PollutionInfo } from "./PollutionInfo/PollutionInfo";
import c from "./MapPage.module.css";

const MapPage: React.FC = () => {
  return (
    <div className={c.cont}>
      <GoogleMapCont />
      <PollutionInfo />
    </div>
  );
};

export default MapPage;
