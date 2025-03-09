import { useState } from "react"
import Die from "../../Components/Die/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import "./Tenzies.css"
import Navbar from "../../Components/Navbar/Navbar"

export default function Tenzies() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const [turns,setTurns]=useState(1)
    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)
    const gameLost= dice.every(die => die.isHeld) && (!gameWon)

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }
    
    function rollDice() {
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
            setTurns((prev)=>prev+1)
        } else {
            setTurns(1)
            setDice(generateAllNewDice())
        }
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))
    return (
        <div className="bodyt">
            <Navbar />
            <div className="roott">
                <main className="maint">
                    {gameWon && <Confetti />}
                    <h1 className="title">Tenzies</h1>
                    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                    <p className="turn-display">{gameLost?"Game Over !!!":`Moves = ${turns}`}</p>
                    <div className="dice-container">
                        {diceElements}
                    </div>
                    {gameWon&&<p className="turn-display">You Have Taken {turns} Moves </p>}
                    <button className="roll-dice" onClick={rollDice}>
                        {gameWon ? "New Game" :gameLost? "Try Again": "Roll"}
                    </button>
                </main>
            </div>
        </div>
    )
}