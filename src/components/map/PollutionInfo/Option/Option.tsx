import React from "react";
import c from "./Option.module.css";

interface IOptionProps {
  title: string;
  value: number;
}

export const Option: React.FC<IOptionProps> = ({ title, value }) => {
  return (
    <div className={c.option}>
      <h6>{title}</h6>
      <span>{value}</span>
    </div>
  );
};
