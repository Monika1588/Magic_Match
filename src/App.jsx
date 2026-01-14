import { useState, useEffect } from "react";
import cardsData from "./data/cardsData";
import Card from "./components/Card";
import "./index.css";

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false); 

  const shuffleCards = () => {
    const shuffled = [...cardsData, ...cardsData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));

    setCards(shuffled);
    setMoves(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setGameCompleted(false); 
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare the two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.name === choiceTwo.name) {
        setCards((prev) =>
          prev.map((c) =>
            c.name === choiceOne.name ? { ...c, matched: true } : c
          )
        );
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
      }
      setMoves((prev) => prev + 1);
    }
  }, [choiceOne, choiceTwo]);

  // Check game complete
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setTimeout(() => setGameCompleted(true), 500);
    }
  }, [cards]);

  // Reset choices
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>✨ Magic Match ✨</h1>
      <button className="new-game-btn" onClick={shuffleCards}>
        New Game
      </button>

      <p className="moves">Moves: {moves}</p>

      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne || card === choiceTwo || card.matched
            }
            disabled={disabled}
          />
        ))}
      </div>

      {}
      {gameCompleted && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You completed the game in <b>{moves}</b> moves.</p>

            <button className="popup-btn" onClick={shuffleCards}>
              Play Again 🔁
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
