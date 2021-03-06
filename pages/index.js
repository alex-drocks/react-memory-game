import {useEffect, useState} from "react";
import {nanoid} from 'nanoid'
import Card from "../components/Card";

const cardImages = [
  {"src": "/images/helmet-1.png", matched: false},
  {"src": "/images/potion-1.png", matched: false},
  {"src": "/images/ring-1.png", matched: false},
  {"src": "/images/scroll-1.png", matched: false},
  {"src": "/images/shield-1.png", matched: false},
  {"src": "/images/sword-1.png", matched: false},
]

export default function Index() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choice1, setChoice1] = useState(null)
  const [choice2, setChoice2] = useState(null)
  const [disabled, setDisabled] = useState(false)


  function shuffleCards() {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: nanoid()}))

    setCards(shuffledCards)
    setTurns(0)
    setChoice1(null)
    setChoice2(null)
  }

  function handleChoice(card) {
    choice1 ? setChoice2(card) : setChoice1(card)
  }

  function resetTurn() {
    setChoice1(null)
    setChoice2(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    if (choice1 && choice2) {
      setDisabled(true)

      if (choice1.src === choice2.src && choice1.id !== choice2.id) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choice1.src) {
              return {
                ...card,
                matched: true
              }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(resetTurn, 900)
      }
    }
  }, [choice1, choice2])

  useEffect(() => {
    shuffleCards()
  }, [])

  return (<>
      <h1>Magic Match</h1>

      <div className="card-grid">
        {
          cards.map(card => (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              isFlipped={Boolean(card === choice1 || card === choice2 || card.matched)}
              disabled={Boolean(disabled)}
            />
          ))
        }
      </div>

      <p>
        Turns: {turns}
      </p>

      <button onClick={shuffleCards}>New Game</button>

      <br/>
      <br/>
      <br/>
      <br/>
      <a href="https://github.com/alex-drocks/react-memory-game">See Source Code on Github</a>
    </>
  )
}
