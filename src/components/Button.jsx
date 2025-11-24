import { useState } from "react";

export default function Button(props) {
  const [isActive, setIsActive] = useState(false);

  function handleChangeColor() {
    console.log("Click en botón de categorías");
    setIsActive(!isActive);
  }

  const colorFondo = isActive ? "#ba6743ff" : "#4353baff";

  return (
    <button
      onClick={handleChangeColor}
      style={{
        backgroundColor: colorFondo,
        border: "none",
        padding: "10px 18px",
        borderRadius: "6px",
        color: "#fff",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      {props.label}
    </button>
  );
}