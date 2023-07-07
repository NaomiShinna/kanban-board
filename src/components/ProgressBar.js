import React, {useState, useEffect} from 'react'
import './ProgressBar.css'

function ProgressBar(){
    const [filled, setFilled] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if(filled < 100 && isRunning){
            setTimeout(() => setFilled(prev => prev += 2), 50)
        }
    }, [filled, isRunning])

    return (
        <div>
            <div className='progressbar'>
                <div style={{
                    height: "100%",
                    width: `${filled}%`,
                    backgroundColor: filled == "100" ? "#28a745" : "#01959F",
                    transition: "width 0.5s"
                }}>
                    <span>{filled}%</span>
                </div>
            </div>
            <button className='btn' onClick={()=>setIsRunning(true)}>test</button>
        </div>
    )
    
}

export default ProgressBar;