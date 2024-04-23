import React from "react";
import c from "./NavOption.module.css";
import { Link, useLocation } from "react-router-dom";

interface INavOptionProps {
  path: string;
  label: string;
}

export const NavOption: React.FC<INavOptionProps> = ({ path, label }) => {
  const location: string = useLocation().pathname;

  return (
    <Link
      className={
        location === path ? c.option + " " + c.optionChoosen : c.option
      }
      to={path}
    >
      {label}
    </Link>
  );
};
