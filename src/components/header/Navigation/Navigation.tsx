import React from "react";
import c from "./Navigation.module.css";
import { NavOption } from "./NavOption/NavOption";

const Navigation: React.FC = () => {
  return (
    <nav className={c.navigation}>
      <NavOption path="/home" label="Головна" />
      <NavOption path="/map" label="Карта" />
      <NavOption path="/pollutants" label="Забруднювачі" />
      <NavOption path="/top" label="Топ UA" />
    </nav>
  );
};

export default Navigation;
