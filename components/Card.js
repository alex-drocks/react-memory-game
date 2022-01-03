export default function Card({card, handleChoice, isFlipped, disabled}) {

  function handleClick() {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className={`card${isFlipped ? " is-flipped" : ""}`}>
      <img
        className="card-front"
        src={card.src}
        alt="card's front"
      />
      <img
        className="card-back"
        src="img/cover.png"
        alt="card's front"
        onClick={handleClick}
      />
    </div>
  )
}