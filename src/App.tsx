import Any, { Easings } from "./exports";
import { useEffect, useState } from "react";

function App() {
    const [start, setStart] = useState(false);
    const [duration, setDuration] = useState(2000);

    useEffect(() => {
        setTimeout(() => {
            setStart(true);
        }, 2000);
    }, []);

    return (
        <div>
            <div
                style={{
                    transitionProperty: 'all',
                    transitionDuration: duration + "ms",
                    transitionTimingFunction: 'linear',
                }}
                className={`
                    aspect-square w-[50px] bg-blue-300
                    ${
                        start ? 'translate-x-0' : 'translate-x-[300px]'
                    }
                `}>
            </div>
            <br /><br />
            <button onClick={() => setDuration(500)}>Update</button>
        </div>
    );
}

export default App;
