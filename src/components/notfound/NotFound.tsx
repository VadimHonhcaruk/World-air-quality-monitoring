import React from "react";
import c from "./NotFound.module.css";

export const NotFound: React.FC = () => {
  return (
    <div className={c.cont}>
      <h1>
        <span className={c.error}>404</span> |{" "}
        <span className={c.not}>NOT FOUND</span>
      </h1>
    </div>
  );
};
