import { useState } from "react";
import cards from "./Cards";
import { Button, Dropdown, Card, Text } from "@nextui-org/react";
import "./App.css";

function App() {
  const [deck, setDeck] = useState(cards);
  const [deckCard, setDeckCard] = useState([]);

  const handleShuffle = () => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setDeck(shuffledDeck);
  };

  const handleSort = (type) => {
    //sort the deck alphabetically

    switch (type) {
      case "alphabetical":
        const sortedDeck = [...deck].sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setDeck(sortedDeck);
        break;
      case "reverse":
        const reverseDeck = [...deck].reverse();
        setDeck(reverseDeck);
        break;
      default:
        break;
    }
  };

  const handleDraw = (card) => {
    setDeckCard([...deckCard, card]);
    console.log(card);
    setDeck(deck.filter((c) => c.id !== card.id));
  };

  return (
    <div className="App">
      <div className="card-zone">
        <div className="options">
          <Button onClick={handleShuffle}>Shuffle</Button>
          <Dropdown>
            <Dropdown.Button flat>Sort</Dropdown.Button>
            <Dropdown.Menu
              onAction={(e) => {
                handleSort(e);
              }}
            >
              <Dropdown.Item key="alphabetical">Alphabetical</Dropdown.Item>
              <Dropdown.Item key="reverse">Reverse</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {deck.map((card) => (
          <Card
            isPressable
            onPress={() => {
              handleDraw(card);
            }}
            isHoverable
            variant="bordered"
            css={{ mw: "100px" }}
          >
            <Card.Body>
              <Text>{card.name}</Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="draw-zone">
        {deckCard.map((card) => (
          <Card isHoverable variant="bordered" css={{ mw: "100px" }}>
            <Card.Body>
              <Text>{card.name}</Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
