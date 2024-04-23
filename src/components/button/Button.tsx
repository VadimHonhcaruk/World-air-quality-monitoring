import React from "react";
import c from "./Button.module.css";

interface IButtonProps {
  title: string;
  onClick: () => void;
}

export const Button: React.FC<IButtonProps> = ({ title, onClick }) => {
  return (
    <button className={c.button} onClick={onClick}>
      {title}
    </button>
  );
};
