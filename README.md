# `Any`

Any is a JavaScript library for creating React Animating Components.

The `@soatra/any` package contains only one component \<Any /> and some of neccessary types. With component \<Any />, you can build however animating components as you want.

## Usage

### Default:
```js
import Any from '@soatra/any';

const MyComponent = () => {
    return (
        <>
            <Any
                from="opacity-0"
                to={[
                    {
                        state: 'opacity-100',
                        duration: 1000,
                        easing: 'linear'
                    },
                ]}>
                <p>Animation</p>
            </Any>
        </>
    );
}

export default MyComponent;
```

### Using start:
```js
...
import { useState } from 'react';

const MyComponent = () => {
    const [start, setStart] = useState(false);

    return (
        <>
            <Any
                ...
                start={start}
                onStart={() => setStart(true)}>
                ...
            </Any>
        </>
    );
}

...
```
### Loop:
```js
...
    <Any
        ...
        start={start}
        onStart={() => setStart(true)}
        onComplete={() => setStart(false)}>
        ...
    </Any>
...
```

### Multiple to states
```js
...
    <Any
        ...
        to={[
            {
                state: 'opacity-50',
                duration: 1000,
                easing: 'linear',
                // here, you can define condition for moving state
            },
            {
                state: 'opacity-100',
                duration: 1000,
                easing: 'linear',
                // here too
            },
            // ...
        ]}
        ...>
        ...
    </Any>
...
```

## Props

### from:
Type: `string` Required

The initial state (class).

### to:
Type: `To[]` Required

`To`:\
&emsp;start: `boolean | undefined`\
&emsp;state: `string`\
&emsp;duration: `number`\
&emsp;delay?: `number`\
&emsp;easing: `Easing`\
&emsp;onEnd?: `() => void`

The Flow-to states.

### start:
Type: `boolean` Default: `undefinded`

A state variable is used to start or restart the animation.

### onStart:
Type: `() => void` Default: `undefinded`

A function that is emited when animation is starting.

### onComplete:
Type: `() => void` Default: `undefinded`

A function that is emited when animation is Completing.

###### ...

## License

[MIT](https://github.com/JohnSoatra/any/blob/main/LICENSE)

