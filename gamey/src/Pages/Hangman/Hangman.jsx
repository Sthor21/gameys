import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "../../assets/languages"
import { getFarewellText, getRandomWord } from "../../assets/utils"
import Confetti from "react-confetti"
import "./Hangman.css"
import Navbar from "../../Components/Navbar/Navbar"

export default function Hangman() {
    // State values
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])

    // Derived values
    const numGuessesLeft = languages.length - 1
    const wrongGuessCount =
        guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const isGameWon =
        currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= numGuessesLeft
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    function startNewGame() {
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
    }

    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", isLanguageLost && "lost")
        return (
            <span
                className={className}
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const letterElements = currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })

    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        return (
            <button
                className={className}
                key={letter}
                disabled={isGameOver}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p className="farewell-message">
                    {getFarewellText(languages[wrongGuessCount - 1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        }
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>Better pray they dont find your web history 😭</p>
                </>
            )
        }

        return null
    }

    return (
        <div className="bodyh">
            {
                isGameWon && 
                    <Confetti
                        recycle={false}
                        numberOfPieces={1000}
                    />
            }
            <Navbar bg="black" color="white"/>
            <div className="hangman-container">
                <main className="hmain">
                    <header>
                        <h1>Cyber Siege: Last Defense</h1>
                        <p>Guess the word within 8 attempts to prevent a cyberattack!</p>
                    </header>

                    <section
                        aria-live="polite"
                        role="status"
                        className={gameStatusClass}
                    >
                        {renderGameStatus()}
                    </section>

                    <section className="language-chips">
                        {languageElements}
                    </section>

                    <section className="word">
                        {letterElements}
                    </section>
                    <section
                        className="sr-only"
                        aria-live="polite"
                        role="status"
                    >
                        <p>
                            {currentWord.includes(lastGuessedLetter) ?
                                `Correct! The letter ${lastGuessedLetter} is in the word.` :
                                `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                            }
                            You have {numGuessesLeft} attempts left.
                        </p>
                        <p>Current word: {currentWord.split("").map(letter =>
                            guessedLetters.includes(letter) ? letter + "." : "blank.")
                            .join(" ")}</p>

                    </section>

                    <section className="keyboard">
                        {keyboardElements}
                    </section>

                    {isGameOver &&
                        <button
                            className="new-game"
                            onClick={startNewGame}
                        >New Game</button>}
                </main>
                </div>
        </div>
    )
}
