import "./App.css";
import {
  EggSettingsContext,
  EggSettingsProvider,
} from "./contexts/EggSettingsContext";
import Section from "./components/Section/Section";
import { useContext, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { sizeValues, recipeValues, tempValues } from "./constants/values";

enum SettingType {
  Size = "size",
  Temp = "temp",
  Recipe = "recipe",
}

function AppWrapper() {
  return (
    <EggSettingsProvider>
      <App />
    </EggSettingsProvider>
  );
}

function App() {
  const { eggSettings, setEggSettings } = useContext(EggSettingsContext);
  const [isTimerPlaying, setIsTimerPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [sliderKey, setSliderKey] = useState(0);
  const [color, setColor] = useState("#85ff7a");
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const result = eggSettings.temp * eggSettings.size * eggSettings.recipe;
    if (result > 0) {
      setTime(result);
    } else {
      setTime(result);
    }
  }, [eggSettings]);

  const handleSelection = (type: string, value: number) => {
    setEggSettings({ ...eggSettings, [type]: value });
    setSliderKey(Math.floor(Math.random() * 100) + 1);
  };

  const reset = () => {
    setSliderKey(Math.floor(Math.random() * 100) + 1);
    setIsTimerPlaying(false);
    setEggSettings({
      size: 0,
      temp: 0,
      recipe: 0,
    });
    setTime(0);
  };

  const toggleTimer = () => {
    time > 0 && setIsTimerPlaying((prevValue) => !prevValue);
  };

  const getSeconds = (remainingTime: any) => {
    return (remainingTime - 60 * Number(getMinutes(remainingTime)))
      .toString()
      .padStart(2, "0");
  };

  const getMinutes = (remainingTime: any) => {
    return Math.floor(remainingTime / 60)
      .toString()
      .padStart(2, "0");
  };

  useEffect(() => {
    setColor(
      remaining > 59 ? "#85ff7a" : remaining > 30 ? "#fcae1e" : "#EE4B2B"
    );
  }, [remaining]);

  return (
    <div className="App ">
      <Section
        type={SettingType.Size}
        selected={eggSettings[SettingType.Size]}
        onSelectionUpdate={handleSelection}
        isDisabled={isTimerPlaying}
        values={sizeValues}
        title={"Seleziona la dimensione delle uova"}
      ></Section>
      <Section
        type={SettingType.Temp}
        selected={eggSettings[SettingType.Temp]}
        onSelectionUpdate={handleSelection}
        isDisabled={isTimerPlaying}
        values={tempValues}
        title={"Imposta la temperatura di cottura"}
      ></Section>
      <Section
        type={SettingType.Recipe}
        selected={eggSettings[SettingType.Recipe]}
        onSelectionUpdate={handleSelection}
        isDisabled={isTimerPlaying}
        values={recipeValues}
        title={"Come vuoi cucinarle?"}
      ></Section>

      <div className="tile" style={{ backgroundColor: color }}>
        <div onClick={() => toggleTimer()}>
          <CountdownCircleTimer
            // Senza key, succede che dopo aver avviato il timer, se cambio i parametri, il timer parte con il remainingTime precedente;
            // Se setto una Key random questo problema non si pone, però poi si resetta anche allo stop quindi non va bene.
            // A questo punto, quando il timer è avviato, disattivo i button.
            // key={Math.floor(Math.random() * 100) + 1}

            // Provo con una key gestita da me, che resta uguale quando stoppo, cambia quando cambio selezione / resetto
            key={sliderKey}
            isPlaying={isTimerPlaying}
            duration={time}
            // colors="#85ff7a"
            colors="#ffffff"
            trailColor="rgba(250,250,250, 0.4)"
            rotation="counterclockwise"
            onUpdate={(remainingTime) => setRemaining(remainingTime)}
          >
            {({ remainingTime }) => (
              <div>
                {/* <div className="time">{remainingTime}</div> */}
                {/* In questo caso, perché la classe non funzionava e l'inline sì? */}

                <div className="time-text">
                  {getMinutes(remainingTime)}:{getSeconds(remainingTime)}
                </div>
                <div className="player-text">
                  {isTimerPlaying ? "Stop" : time > 0 ? "Play" : "Start"}
                </div>
              </div>
            )}
          </CountdownCircleTimer>
        </div>
        <div className="buttons">
          <button onClick={() => reset()}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default AppWrapper;
