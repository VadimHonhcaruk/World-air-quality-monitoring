import React from "react";
import c from "./CustomSlide.module.css";

interface ICustomSlideProps {
  path: string;
  alt: string;
}

export const CustomSlide: React.FC<ICustomSlideProps> = ({ alt, path }) => {
  return <img alt={alt} src={path} className={c.photo} />;
};
