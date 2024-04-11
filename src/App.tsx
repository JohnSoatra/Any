import { useState } from "react";
import Any, { Easings } from "./exports";

const App = () => {
    const [start, setStart] = useState(false);

    return (
        <div className="w-full flex justify-center py-10">
            <Any
                start={start}
                from="text-red-500"
                to={[
                    {
                        state: 'text-blue-500',
                        duration: {
                            xs: 1000
                        },
                        easing: {
                            xs: Easings.BackIn
                        }
                    },
                    {
                        state: 'text-yellow-500',
                        duration: {
                            xs: 1000
                        },
                        easing: {
                            xs: Easings.BackIn
                        }
                    },
                    {
                        state: 'text-cyan-500',
                        duration: {
                            xs: 1000
                        },
                        easing: {
                            xs: Easings.BackIn
                        }
                    }
                ]}
                onStart={() => {
                    console.log('onstart');
                    setStart(true);
                }}
                onComplete={() => {
                    console.log('on compelte');
                    setStart(false);
                }}>
                <p>Hello world</p>
            </Any>
        </div>
    );
}

export default App;