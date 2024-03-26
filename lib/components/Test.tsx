import React, { useState } from "react";

const Test = () => {
    const [a, setA] = useState(2);

    return (
        <div>
            <div className="p-10 text-red-400">
                <h2>This is h2</h2>
                <p>a = {a}</p>
                <button onClick={() => setA(a + 1)}>increase</button>
            </div>
        </div>
    );
}

export default Test;