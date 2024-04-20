import Any, { Easings } from "./exports";
import { useEffect, useState } from "react";

function App() {
    const [start, setStart] = useState(false);
    // const [duration, setDuration] = useState(2000);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setStart(true);
    //     }, 2000);
    // }, []);

    return (
        <div
            className="flex justify-center p-10">
            <Any
                className="w-fit"
                from="translate-x-[20px]"
                to={[
                    {
                        state: 'translate-x-[-20px]',
                        easing: 'linear',
                        duration: 3000,
                        on: {
                            complete: 0.91,
                            task: () => {
                                setStart(true);
                            }
                        }
                    }
                ]}>
                <Any
                    from="translate-x-[200px]"
                    to={[
                        {
                            state: 'translate-x-[-200px]',
                            easing: Easings.Cubic(0, 0.82, 1, 0.19),
                            duration: 3000
                        }
                    ]}>
                    <Any
                        from="opacity-0"
                        to={[
                            {
                                state: 'opacity-100',
                                easing: Easings.ExpoOut,
                                duration: 250
                            },
                            {
                                start: start,
                                state: 'opacity-0',
                                easing: 'linear',
                                duration: 250
                            }
                        ]}>
                        <p>Helloworld</p>
                    </Any>
                </Any>
            </Any>
        </div>
    );
}

export default App;
