import { Linkedin,Instagram,Github,Mail } from "lucide-react"
import "./Socials.css"
export default function Socials(props){
    return(
        <div className="icons-container" ref={props.section}>
            <h1><i>Contact Us</i></h1>
            <div className="icons-display" >
                <div className="elements" onClick={() => window.open("https://www.linkedin.com/in/shashank-s-391a58266/", "_blank")}><Linkedin size={32} className="lucide"/><span>Linkedin</span></div>
                <div className="elements"onClick={() => window.open("https://www.instagram.com/prime_295/", "_blank")}><Instagram size={32} className="lucide"/><span>Instagram</span></div>
                <div className="elements"onClick={() => window.open("mailto:ridingknight2@gmail.com", "_blank")}><Mail size={32} className="lucide"/><span>Email</span></div>
                <div className="elements"onClick={() => window.open("https://github.com/Sthor21", "_blank")}><Github size={32} className="lucide"/><span>Github</span></div>
            </div>
        </div>
        
    
    )
}