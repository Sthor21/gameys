import {useState} from "react"
import "./Form.css"
export default function Form(props) {
    const [displaySize,setDisplaySize]=useState(5)
    function handleChange(e)
    {
        if(e.target.value<1 || e.target.value>15)
        {
            setDisplaySize("enter a valid number");
        }
        else 
            setDisplaySize(e.target.value)
    }
    return (
        <form className="wrapper" onSubmit ={props.handleClick}>
            <input 
            type="number" 
            name="input_size"
            value={displaySize}
            onChange={handleChange}
            min="5"
            max="15"/>
            <button class="btn btn--text">
                Start Game
            </button>
        </form>
    )
}