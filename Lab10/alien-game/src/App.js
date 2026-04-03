import React, { useState, useEffect } from "react";

// Card Component (inside same file)
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

function App() {
  const signals = ["👽", "🛸", "🚀", "🌌", "✨", "🪐", "☄️", "🔭"];

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize + Shuffle Cards
  useEffect(() => {
    const duplicated = [...signals, ...signals];

    const shuffled = duplicated
      .map((item) => ({ value: item, id: Math.random() }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
  }, []);

  // Timer
  useEffect(() => {
    let interval;

    if (gameStarted && matchedCards.length < 16) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameStarted, matchedCards]);

  // Match / Mismatch Logic
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      if (cards[first].value === cards[second].value) {
        // Match
        setMatchedCards((prev) => [...prev, first, second]);
        setScore((prev) => prev + 100);
        setFlippedCards([]);
      } else {
        // Mismatch
        setScore((prev) => prev - 10);

        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  // Handle Click
  const handleClick = (index) => {
    if (!gameStarted) setGameStarted(true);

    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    ) {
      return;
    }

    setFlippedCards((prev) => [...prev, index]);
  };

  const isGameComplete = matchedCards.length === 16;

  const timeBonus = isGameComplete
    ? Math.max(0, 500 - time * 5)
    : 0;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>👽 Alien Signal Decryption</h1>

      <h3>Score: {score}</h3>
      <h3>Time: {time}s</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 80px)",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleClick(index)}
            isFlipped={flippedCards.includes(index)}
            isMatched={matchedCards.includes(index)}
          />
        ))}
      </div>

      {isGameComplete && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <h2>🎉 Decryption Complete!</h2>
          <h3>Final Score: {score + timeBonus}</h3>
          <p>Time Bonus: {timeBonus}</p>
        </div>
      )}
    </div>
  );
}

export default App;