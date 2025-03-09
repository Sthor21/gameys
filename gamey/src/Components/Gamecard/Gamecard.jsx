import"./Gamecard.css"
import { Link } from "react-router-dom";

export default function Gamecard(props){
    return(
        <div className="card-container" style={{backgroundColor:props.color}}>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <Link to={props.path} className="button">Play Game</Link>
        </div>
    )
}