import React, {  useState, useEffect } from "react";
import './Reaction.css'



function Reaction() {
    const  [timer, setTimer] = useState(0)
    const [countdown, setCountdown] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [bgColor, setBgColor] = useState('')

    const handleTimer = () => {
        setInterval(() => {
            setTimer(prevTimer => prevTimer + 1)
        }, 1)
        setCountdown(0)
    }

    const backgroundChange = () => {
        let num = Math.floor(Math.random() * 5000);
        setCountdown(setInterval(() => {
            console.log('hello')
            setBgColor('green')
        }, num)
        )
    }



    return (
        <div>
            <button onClick={handleTimer}>{timer}</button>
            <button onClick={backgroundChange} style={{backgroundColor: bgColor}}>howdy</button>
        </div>
    )
}

export default Reaction
