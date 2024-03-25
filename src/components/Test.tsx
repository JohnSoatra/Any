import React, { useState } from "react";

const Test = () => {
    const [a, setA] = useState(2);

    return (
        <div>
            <p>a = {a}</p>
            <button onClick={() => setA(a + 1)}>increase</button>
        </div>
    );
}

export default Test;