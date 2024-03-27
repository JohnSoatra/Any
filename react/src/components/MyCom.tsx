import React, { useState } from 'react';
import Any, { AnyProps, AnyTags } from '@soatra/any';

const MyComponent = function<T extends AnyTags>({ ...props }:  AnyProps<T>) {
    const [start, setStart] = useState(false);
    const [start2, setStart2] = useState(false);

    return (
        // <Any
        //     start={start2}
        //     className='p-20 w-fit'
        //     from='opacity-0'
        //     to={[
        //         {
        //             state: 'opacity-50',
        //             duration: 1000,
        //             easing: 'linear'
        //         },
        //         {
        //             state: 'opacity-1000',
        //             duration: 1000,
        //             easing: 'linear'
        //         },
        //         {
        //             state: 'opacity-50',
        //             duration: 1000,
        //             easing: 'linear'
        //         }
        //     ]}
        //     onStart={() => setStart2(true)}
        //     onComplete={() => setStart2(false)}>
        //     <Any
        //         start={start}
        //         from='translate-x-full'
        //         to={[
        //             {
        //                 state: 'translate-x-0',
        //                 duration: 1000,
        //                 easing: 'outBack'
        //             },
        //             {
        //                 state: '-translate-x-full',
        //                 duration: 1000,
        //                 easing: 'outBack'
        //             },
        //             {
        //                 state: 'translate-x-0',
        //                 duration: 1000,
        //                 easing: 'outBack'
        //             },
        //             {
        //                 state: 'translate-x-full',
        //                 duration: 1000,
        //                 easing: 'outBack'
        //             }
        //         ]}
        //         onStart={() => setStart(true)}
        //         onComplete={() => setStart(false)}>
                <p>Helloworld</p>
        //     </Any>
        // </Any>
    );
}

export default MyComponent;