import { useState } from "react";
import Any, { Easings } from "./exports";

const App = () => {
    const [start, setStart] = useState(false);
    const [startTop, setStartTop] = useState(false);

    return (
        <div className="w-full flex justify-center py-10">
            <Any
                from="opacity-0"
                to={[
                    {
                        state: 'opacity-100',
                        duration: 350,
                        easing: Easings.ExpoOut
                    },
                    {
                        start: startTop,
                        state: 'opacity-0',
                        duration: 350,
                        easing: Easings.ExpoOut,
                    }
                ]}>
                <Any
                    as="p"
                    from="translate-x-[300px]"
                    to={[
                        {
                            state: '-translate-x-[300px]',
                            duration: 3000,
                            easing: Easings.Cubic(0,.82,1,.19),
                            on: [
                                {
                                    complete: 0.9,
                                    task: () => {
                                        console.log('on 80%');
                                        setStartTop(true);
                                    }
                                }
                            ]
                        }
                    ]}>
                    Hello world
                </Any>
            </Any>
        </div>
    );
}

export default App;