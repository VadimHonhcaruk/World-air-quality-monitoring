import React from "react";
import c from "./Pollutant.module.css";

interface IPollutantsProps {
  title: string;
  src: string;
  paragraph: string;
}

export const Pollutant: React.FC<IPollutantsProps> = ({
  title,
  src,
  paragraph,
}) => {
  return (
    <div className={c.pollTopic}>
      <h3 className={c.subtitle}>{title}</h3>
      <div className={c.flex}>
        <p className={c.paragraph}>{paragraph}</p>
        <img className={c.image} src={src} alt={title}></img>
      </div>
    </div>
  );
};
