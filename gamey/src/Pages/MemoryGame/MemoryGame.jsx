import { useState, useEffect } from "react"; 
import Form from "../../Components/Form/Form";
import "./MemoryGame.css"
import Navbar from "../../Components/Navbar/Navbar";
export default function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [size, setSize] = useState(0);
  const [displayCards, setDisplayCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [seconds, setSeconds] = useState(0);
  
  function handleinput(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    setSize(formdata.get("input_size"));
    // Reset the timer when the form is submitted
    setSeconds(0);
  }
  
  useEffect(() => {
    let timer;
    if (isGameOn && !isGameWon) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameOn, isGameWon]);
  
  useEffect(() => {
    if (displayCards.length > 0 && displayCards.every((c) => c.isMatched)) {
      setIsGameWon(true);
    }
  }, [displayCards]);
  
  useEffect(() => {
    if (size > 0) {
      startGame();
    }
  }, [size]);
  
  // API call and card setup
  async function startGame() {
    try {
      // Reset the timer before starting the game
      setSeconds(0);
      
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${size}`);
      if (!response.ok) {
        throw new Error("Could not fetch data from API");
      }
      const data = await response.json();

      // Set gameCards
      const temp = data.results.map((ele) => ({
        id: ele.url.split("/")[6],
        key: ele.name, // Data key, not React key
        name: ele.name,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ele.url.split("/")[6]}.png`,
        isFlipped: false,
        isMatched: false,
      }));
      // Generate displayCards immediately
      const arr = [];
      for (let i = 0; i < 2 * size; i++) {
        arr.push({
          index: i,
          key: i, // Unique key for rendering
          name: temp[i % size].name,
          url: temp[i % size].url,
          isFlipped: false,
          isMatched: false,
        });
      }
      setDisplayCards(shuffleArray(arr));

      setIsGameOn(true);
    } catch (err) {
      console.error(err);
    }
  }

  // Map displayCards to divs
  const cards = displayCards.map((card) => (
    <div
      key={card.index}
      className={`memory-card-display ${card.isFlipped ? "flipped" : ""} ${
        card.isMatched ? "matched" : ""
      }`}
      onClick={() => turnCard(card)}
      style={{
        backgroundImage: card.isFlipped || card.isMatched ? `url(${card.url})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!card.isFlipped && !card.isMatched && "?"}
    </div>
  ));

  // Handle card flipping and matching
  function turnCard(card) {
    if (card.isFlipped || card.isMatched) return; // Prevent flipping already flipped/matched cards

    if (selectedCard === null) {
      // First card flipped
      setDisplayCards((prevCards) =>
        prevCards.map((c) =>
          c.index === card.index ? { ...c, isFlipped: true } : c
        )
      );
      setSelectedCard(card);
    } else {
      // Second card flipped
      setDisplayCards((prevCards) =>
        prevCards.map((c) =>
          c.index === card.index ? { ...c, isFlipped: true } : c
        )
      );

      // Check for match
      if (selectedCard.name === card.name) {
        setDisplayCards((prevCards) =>
          prevCards.map((c) =>
            c.index === selectedCard.index || c.index === card.index
              ? { ...c, isFlipped: true, isMatched: true }
              : c
          )
        );
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setDisplayCards((prevCards) =>
            prevCards.map((c) =>
              c.index === selectedCard.index || c.index === card.index
                ? { ...c, isFlipped: false }
                : c
            )
          );
        }, 500); // 0.5-second delay
      }
      setSelectedCard(null); // Reset after second card
    }
  }
  
  function handleNewGame() {
    setIsGameOn(false);
    setIsGameWon(false);
    setSize(0)
    setSeconds(0); // Reset timer when starting a new game
  }
  
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  return (
    <div className="mem-container">
      <Navbar bg="#121212" color="white"/>
      <main className="memory-main">
        {(isGameOn || isGameWon) && displayCards.length > 0 ? (
          <div className="game-card-container">
            {!isGameWon &&<div className="timer">⏳ Time: {seconds} sec</div>}
            {isGameWon && (
              <div className="game-won-container">
                <h2>🎉 You won in {seconds} seconds! 🎉</h2>
                <button onClick={handleNewGame}>New Game</button>
              </div>
            )}
            <div className="game-board">{cards}</div>
          </div>
        ) : (
          <div className="landing-container">
            <div class="logo">
              <div class="logo-icon"></div>
              PokéMemory
            </div>
            <h1 className="mem-title-text">Train Your Brain with <span>Pokémon Memory</span></h1>
            <p className="subtitle">Challenge yourself with our fun and addictive memory matching game featuring your favorite Pokémon characters. Perfect for all ages!</p>
            <div class="difficulty-label">Choose difficulty level (5-15):</div>
            <Form handleClick={handleinput} />
            <section class="features" id="features">
              <div class="feature-grid">
                <div class="feature-card">
                  <div class="feature-icon">⏱️</div>
                  <h3 class="feature-title">Time Challenge</h3>
                  <p class="feature-desc">Race against the clock to match all pairs and beat your previous records.</p>
                </div>
                
                <div class="feature-card">
                  <div class="feature-icon">🎮</div>
                  <h3 class="feature-title">Customizable Difficulty</h3>
                  <p class="feature-desc">Choose how many Pokémon pairs to play with, adjusting the difficulty to your skill level.</p>
                </div>
              </div>
            </section>
          
          </div>
        )}
        
      </main>
      <footer>
        <p>© 2025 Memory Game. All Pokémon images are property of Nintendo.</p>
      </footer>
    </div>
  );
}