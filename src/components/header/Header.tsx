import React from "react";
import c from "./Header.module.css";
import Title from "./Title/Title";
import Navigation from "./Navigation/Navigation";

const Header: React.FC = () => {
  return (
    <header className={c.header}>
      <Title />
      <Navigation />
    </header>
  );
};

export default Header;
