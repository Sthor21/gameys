import "./Navbar.css";
import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <div className="navbar" style={{backgroundColor:props.bg,color:props.color}}>
            <div className="nav-left">
                <Gamepad2 color={props.color}/>
                <h1>Gamey</h1>
            </div>
            <div className="nav-right">
                <Link to="/" className="nav-link" style={{color:props.color}}>Home</Link>
                <Link to="/contribute" className="nav-link"style={{color:props.color}}>Contribute</Link>
                <Link to="/contact" className="nav-link" style={{color:props.color}}>Contact</Link>
            </div>
        </div>
    );
}
