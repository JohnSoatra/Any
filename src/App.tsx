import Any, { Easings } from "./exports";
import { useEffect, useState } from "react";

function App() {
    const [done, setDone] = useState(false);
    const [bg, setBg] = useState('red');
    const [start, setStart] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setStart(true);
    //     }, 1000);
    // }, []);

    return (
        <div
            className="
                p-10
            ">
            <div className="h-[3000px]"></div>
            <Any
                as={'div'}
                start={start}
                instant={true}
                breakpoints={{
                    sm: 500,
                    lg: 200,
                }}
                mergeConfig={{
                    createConfig: [
                        (cofig) => cofig
                    ],
                    configExtension: {

                    }
                }}
                animatedProperties={[
                    'opacity',
                    'transform'
                ]}
                from="opacity-0 translate-x-1/2"
                to={[
                    {
                        state: 'opacity-100 translate-x-0',
                        duration: 2000,
                        easing: Easings.CubicIn,
                        on: {
                            complete: 0.5,
                            task: () => {
                                console.log('on 50%');
                                // alert('complete 0.5')
                            }
                        },
                        onEnd: () => {
                            console.log('on end');
                            setDone(true);
                            setBg('blue');
                        }
                    },
                    {
                        state: '-translate-y-[200px]',
                        duration: 2000,
                        easing: Easings.CubicIn,
                        on: {
                            complete: 0.5,
                            task: () => {
                                console.log('on 50%');
                                // alert('complete 0.5')
                            }
                        },
                        delay: {
                            lg: 3000
                        }
                    }
                ]}
                onStart={() => {setStart(true); setDone(false)}}
                onEnd={() => {
                    console.log('on complete');
                    setStart(false);
                }}>
                <div
                    className="
                        w-[100px]
                    ">
                    <img
                        src={
                            done ?
                            "https://media.post.rvohealth.io/wp-content/uploads/sites/3/2022/07/what_to_know_apples_green_red_732x549_thumb.jpg" :
                            "https://www.buildrestfoods.com/wp-content/uploads/2020/08/green-apply.jpg"
                        }
                        alt="test"
                        sizes="100%"
                    />
                </div>
            </Any>
        </div>
    );
}

export default App;
