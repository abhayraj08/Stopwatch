import {useState, useEffect, useRef} from 'react';

function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false);
    const [elaspedTime, setElapsedRunning] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedRunning(Date.now() - startTimeRef.current);
            },10)
        }

        return() => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elaspedTime;
        // console.log(startTimeRef)
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedRunning(0);
        setIsRunning(false);
    }

    function formatTIme() {

        let hours = Math.floor(elaspedTime / (1000 * 60 *60));
        let minutes = Math.floor(elaspedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elaspedTime / (1000) % 60);
        let milliseconds = Math.floor((elaspedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`
    }
 
    return (
    <div className='stopwatch'>
        <div className='display'>{formatTIme()}</div>
        <div className="controls">
            <button className="start-button" onClick={start}>Start</button>
            <button className="stop-button" onClick={stop}>Stop</button>
            <button className="reset-button" onClick={reset}>Reset</button>
        </div>
    </div>
    )
}

export default Stopwatch