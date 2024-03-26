import React from 'react';
import Any, { __Test,  } from '@soatra/any';

const MyCom = () => {
    return (
        <div>
            <Any
                className='select-none'
                from='opacity-0'
                to={[
                    {
                        state: 'opacity-100',
                        duration: 1000,
                        easing: 'linear'
                    }
                ]}>
                <__Test />
            </Any>
        </div>
    );
}

export default MyCom;