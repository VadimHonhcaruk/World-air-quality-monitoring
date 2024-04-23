import React from "react";
import c from "./Title.module.css";
const logo: string = require("../../../images/icon.svg").default;

const Title: React.FC = () => {
  return (
    <div className={c.title}>
      <img src={logo} alt="logo" className={c.logo} />
      <h1>Моніторинг якості повітря світу</h1>
    </div>
  );
};

export default Title;
