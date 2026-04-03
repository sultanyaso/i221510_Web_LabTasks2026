import React from "react";

const Card = ({ card, onClick, isFlipped, isMatched }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: "80px",
        height: "80px",
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        cursor: "pointer",
        backgroundColor: isMatched
          ? "lightgreen"
          : isFlipped
          ? "white"
          : "gray",
      }}
    >
      {isFlipped || isMatched ? card.value : ""}
    </div>
  );
};

export default Card;