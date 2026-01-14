export default function Card({ card, handleChoice, flipped }) {
    const handleClick = () => {
      if (!card.matched) {
        handleChoice(card);
      }
    };
  
    return (
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.image} alt="front" />
          <img
            className="back"
            src="/images/back.webp"
            alt="back"
            onClick={handleClick}
          />
        </div>
      </div>
    );
  }
  