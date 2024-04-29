import React from "react";
import c from "./ColorInfo.module.css";

interface IColorInfo {
  title: string;
  color: string;
  range: string;
}

export const ColorInfo: React.FC<IColorInfo> = ({ range, title, color }) => {
  const optionStyle = {
    backgroundColor: color,
  };

  return (
    <div className={c.option} style={optionStyle}>
      <div className={c.range}>{range}</div>
      <div>{title}</div>
    </div>
  );
};
