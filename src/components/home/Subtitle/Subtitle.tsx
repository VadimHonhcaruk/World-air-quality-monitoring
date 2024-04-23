import React from "react";
import c from "./Subtitle.module.css";
import { Button } from "../../button/Button";
import { useNavigate } from "react-router-dom";

export const Subtitle: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={c.caption}>
      <h1 className={c.title}>
        Чистота повітря - <span className={c.highlight}>це важливо.</span>
      </h1>
      <h2 className={c.subtitle}>
        Дізнайтеся про якість <span className={c.highlight}>повітря</span> у
        вашому місті та вплив на ваше здоров'я.
      </h2>
      <h2 className={c.subtitle}>
        Відстежуйте та реагуйте: перші кроки до чистого{" "}
        <span className={c.highlight}>повітря</span> у вашому оточенні.
      </h2>
      <Button
        title="Розпочати"
        onClick={() => {
          navigate("/map");
        }}
      />
    </div>
  );
};
