import React from "react";
import MyComponent from "./components/MyCom";

function App() {
    return (
        <div>
            <MyComponent from="opacity-0" to={[{ state: 'opacity-100', duration: 1000, easing: 'linear' }]}>
                <p>Hell owlrd</p>
            </MyComponent>
        </div>
    );
}

export default App;
