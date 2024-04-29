import React from "react";
import c from "./Pollutants.module.css";
import { Pollutant } from "./pollutant/Pollutant";

export const Pollutants: React.FC = () => {
  return (
    <section className={c.cont}>
      <h2 className={c.title}>Основні речовини - забруднювачі повітря</h2>
      {/* <div className={c.vstup}>
        <p className={c.paragraph}>
          Забруднення повітря має негативний вплив на екологію. Викиди від
          промисловості, автотранспорту та інших джерел спричиняють забруднення
          води, ґрунту та впливають на біорізноманіття. Це може призводити до
          загибелі рослин, тварин та навіть екосистем у цілому.
        </p>
        <img
          className={c.image}
          src={require("../../images/earth.png")}
          alt="Опис"
        ></img>
      </div> */}
      <Pollutant
        title="SO2"
        src={require("../../images/so2.png")}
        paragraph="Діоксид сірки (SO2) є одним з найбільш поширених забрудників повітря. Він утворюється внаслідок згоряння вугілля та нафти у промисловості та енергетиці, а також під час спалювання вугілля та інших палив у побутових умовах. SO2 володіє гострим запахом і корозійною властивістю, та може спричиняти серйозні проблеми здоров'я, включаючи подразнення дихальних шляхів, астматичні напади та інші респіраторні захворювання. Крім того, діоксид сірки може призводити до кислотного дощу, що має негативний вплив на водні екосистеми та ґрунт."
      />
      <Pollutant
        title="CO"
        src={require("../../images/co.png")}
        paragraph="Оксид вуглецю (CO) є одним з найпоширеніших та небезпечних забрудників повітря, що утворюється внаслідок неповного згорання палива у транспорті, промисловості та побуті. Цей безбарвний та беззапаховий газ може проникнути в кров, конкуруючи з киснем та спричиняючи отруєння карбоксигемоглобіном. Симптоми отруєння включають головний біль, запаморочення, нудоту, слабкість та навіть смерть у випадках великих концентрацій. Крім того, CO викликає зменшення кисневого потоку до органів та тканин, що може призвести до серйозних уражень серця та легенів. Контроль та зменшення викидів CO є важливим для забезпечення безпеки громадян та підтримки чистого та здорового повітря."
      />
      <Pollutant
        title="NO2"
        src={require("../../images/no2.png")}
        paragraph="Оксид азоту (NO2) є ще одним небезпечним забрудником повітря, який утворюється під час згоряння палива у транспорті, промисловості та побуті. Він має характерний коричневий колір та гострий запах і може викликати серйозні проблеми здоров'я, зокрема подразнення дихальних шляхів, збільшення ризику астми, а також впливати на функціонування легень. Понад тим, NO2 сприяє формуванню смогу та інших шкідливих речовин у повітрі, що може мати негативний вплив на якість життя та екологічний баланс в міських областях. Це підкреслює важливість контролю та зменшення викидів NO2 для збереження якості повітря та здоров'я громадян."
      />
      <Pollutant
        title="O3"
        src={require("../../images/o3.png")}
        paragraph="Озон (O3) є іншим ключовим компонентом атмосферного складу, який, хоча й відіграє важливу роль у верхній частині атмосфери, але може бути шкідливим при знаходженні на нижніх рівнях, де він утворюється внаслідок хімічних реакцій між оксидами азоту та органічними сполуками від палива та інших джерел. Значна концентрація озону в повітрі, особливо в літні місяці та в міських районах, може викликати проблеми здоров'я, такі як подразнення дихальних шляхів, підвищений ризик розвитку астми та інших респіраторних захворювань. Крім того, озон може спричиняти пошкодження рослин та зниження врожаю, що впливає на сільське господарство та екосистеми. Таким чином, контроль рівня озону у повітрі важливий для збереження якості повітря та здоров'я людей та навколишнього середовища."
      />
      <Pollutant
        title="PM10/PM25"
        src={require("../../images/pm25.png")}
        paragraph="PM10 та PM2.5 є двома основними категоріями часток, які знаходяться у повітрі і мають значний вплив на якість повітря та здоров'я людей. PM10 включає частки з діаметром менше 10 мікрометрів, тоді як PM2.5 - це ще дрібніші частки з діаметром менше 2,5 мікрометрів. Ці частки утворюються внаслідок різних процесів, таких як викиди від автотранспорту, промислові викиди, побутове опалення та сільське господарство. Оскільки PM2.5 та PM10 можуть проникати глибоко в легені та навіть в кров, вони становлять серйозну загрозу для здоров'я, спричиняючи респіраторні захворювання, серцево-судинні захворювання та інші проблеми здоров'я. Крім того, вони можуть викликати зменшення видимості, забруднювати водні джерела та шкодити екосистемам. Контроль рівнів PM10 та PM2.5 у повітрі є важливим для забезпечення здорового життя та збереження якості навколишнього середовища."
      />
    </section>
  );
};
