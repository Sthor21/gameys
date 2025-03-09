
import "./Landing.css"
import Navbar from "../../Components/Navbar/Navbar"
import Socials from "../../Components/Socials/Socials"
import Gamecard from "../../Components/Gamecard/Gamecard"
export default function Landing(){
    const games = [
        { name: "Tenzies", description: "A fast-paced dice-rolling game",color:"#FDD132",path: "/tenzies" },
        { name: "Hangman", description: "Guess the word before you run out of chances",color:"#FF7D29",path: "/hangman" },
        { name: "Memory Game", description: "Match pairs of cards to test your memory",color:"#E52020",path: "/memorygame" }
    ];
    const cardElements=games.map((game)=><Gamecard key={game.name} name={game.name} description={game.description} color={game.color} path={game.path}/>)
    return(
        <div className="landing-top-container">
            <Navbar/>
            <div className="hero">
                <h1>Gamey - <span>Play. Compete. Have Fun!</span></h1>
                <p>Welcome to Gamey, your go-to platform for quick and fun gaming! Dive into a collection of engaging mini-games like Tenzies, Hangman, and Memory Game, all in one place. Whether you're looking to challenge your mind or just have a casual gaming session, Gamey has something for you. Simple, interactive, and free to play—start your gaming adventure now!</p>
            </div>
            <div className="card-display">
                {cardElements}
            </div>
            <Socials/>
            
        </div>
    )
}