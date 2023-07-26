import "./Button.css";

type Props = {
  index: number;
  isSelected: boolean;
  isDisabled?: boolean;
  handleSelection: any;
  item: string;
  type: string;
};

export default function Button({
  index,
  isSelected,
  isDisabled,
  handleSelection,
  item,
  type,
}: Props) {
  const handleClick = () => {
    handleSelection(index + 1);
  };

  const recipeContent = () => {
    return (
      <img
        src={process.env.PUBLIC_URL + `/assets/${type}/${index + 1}.png`}
        className="icons"
        style={{ width: "100px", height: "100px" }}
        alt={process.env.PUBLIC_URL + `/assets/${type}/${index + 1}.png`}
      />
    );
  };

  return (
    <div
      className={"selection " + (isSelected ? "selected" : "")}
      onClick={() => !isDisabled && handleClick()}
    >
      <div className="button-title">{item}</div>
      {type === "recipe" ? recipeContent() : null}
    </div>
  );
}
