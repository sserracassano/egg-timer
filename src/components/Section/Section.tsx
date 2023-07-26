import { useContext } from "react";
import { EggSettingsContext } from "../../contexts/EggSettingsContext";
import "./Sections.css";
import Button from "../Button/Button";

type Props = {
  type: string;
  isDisabled?: boolean;
  onSelectionUpdate: (type: string, value: number) => void;
  selected: number;
  values: string[];
  title: string;
};

const Section = ({
  type,
  isDisabled,
  onSelectionUpdate,
  selected,
  values,
  title,
}: Props) => {
  const { eggSettings, setEggSettings } = useContext(EggSettingsContext);

  const handleSelection = (value: number) => {
    if (isDisabled) {
      return;
    }
    setEggSettings({ ...eggSettings, [type]: value });
    onSelectionUpdate(type, value);
  };

  const handleTemp = (event: any) => {
    setEggSettings({ ...eggSettings, [type]: event.target.value });
  };

  return (
    <div className="Section tile">
      <div className="section-title">{title}</div>
      {type === "temp" ? (
        <div className="temp-slider">
          <span>80°</span>
          <input
            type="range"
            min="10"
            max="40"
            value={eggSettings.temp > 0 ? eggSettings.temp : 20}
            onChange={handleTemp}
            step="10"
            disabled={isDisabled}
          />
          <span>200°</span>
        </div>
      ) : (
        <div className="buttons">
          {values.map((item, index) => (
            <Button
              key={index}
              index={index}
              isSelected={selected === index + 1}
              handleSelection={handleSelection}
              item={item}
              type={type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;
