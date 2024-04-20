# Any

Any is a **[React](https://react.dev/)** component library used to create animating components with the help of **[Tailwind CSS](https://tailwindcss.com/)**.

**Main updates** in this version:
1. **breakpoints**: set breakpoints for duration, delay and easing.
2. **after**: move to next state while current state is animating.
3. **on**: handle at a specific point within the animation.

## Usage

### Default:
```js
import Any, { Easings } from '@soatra/any';

const MyComponent = () => {
    return (
        <>
            <Any
                from="opacity-0"
                to={[
                    {
                        state: 'opacity-100',
                        duration: 1000,
                        easing: Easings.Linear
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
        onEnd={() => setStart(false)}>
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
                easing: Easings.Linear
            },
            {
                state: 'opacity-100',
                duration: 1000,
                easing: Easings.Linear
            },
        ]}
        ...>
        ...
    </Any>
...
```

## Properties

### -- from:
Type: `string`

***is used to set initial state.***

### -- to:
Type: `To[]`

`To`:\
&emsp;state: `string`\
&emsp;duration: `number | DurationValueBreakpoints`\
&emsp;easing: `Easing | EasingValueBreakpoints`\
&emsp;delay: `number | DelayValueBreakpoints | undefined`\
&emsp;start: `boolean | undefined`\
&emsp;after: `number | undefined`\
&emsp;on: `On | On[] | undefined`\
&emsp;onEnd: `(() => void) | undefined`

***is used to set flow-to states.***

### -- start:
Type: `boolean | undefined`

***is used to start animation.***

### -- as:
Type: `string | undefined`

***is used to set tag name for the element.***

### -- instant:
Type: `boolean | undefined`

***is used to start animation instantly.***

### -- animatedProperties:
Type: `string[] | undefined`

***is used to set animation properties.***

### -- mergeConfig:
Type: `TailwindMergeType | undefined`

***is used to set tailwind merging configuration.***

### -- breakpoints:
Type: `Breakpoints | undefined`

***is used to set window screen size breakpoints.***

### -- onStart:
Type: `(() => void) | undefined`

***is used to handle when animation is starting.***

### -- onEnd:
Type: `(() => void) | undefined`

***is used to handle when animation is ending.***

##

<div>
    <i style="color: red;"><b>*Note:</b></i>
    <i>To make all these work, you must set up <b>Tailwind CSS</b> in your <b>React App</b>.</i>
</div>

##

## License

[MIT](https://github.com/JohnSoatra/any/blob/main/LICENSE)

