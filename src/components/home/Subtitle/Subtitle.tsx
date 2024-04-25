import React from "react";
import c from "./Subtitle.module.css";
import { Button } from "../../button/Button";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

export const Subtitle: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={c.caption}>
      <h1 className={c.title}>
        Чистота повітря -{" "}
        <span className={c.highlight}>
          <TypeAnimation
            sequence={[
              "це важливо.",
              2000,
              "основа здоров'я.",
              2000,
              "важливий фактор.",
              2000,
              "ключ до комфорту.",
              2000,
              "здоров'я всього світу.",
              2000,
            ]}
            wrapper="span"
            speed={20}
            repeat={Infinity}
          />
        </span>
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
