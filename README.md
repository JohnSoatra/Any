# `Any`

Any is a **[React](https://react.dev/)** component library used to create animating components.
Any helps you create animating components using **[Tailwind CSS](https://tailwindcss.com/)**.

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

## Props

### from:
Type: `string`

The initial state.

### to:
Type: `To[]`

`To`:\
&emsp;state: `string`\
&emsp;duration: `number`\
&emsp;easing: `Easing`
&emsp;delay?: `number`\
&emsp;start?: `boolean`\
&emsp;after?: `number`\
&emsp;on?: `On | On[]`
&emsp;onEnd?: `() => void`

**Easing**:
```
"linear" |
"step-start" |
"step-end" |
"ease" |
"ease-in" |
"ease-out" |
"ease-in-out" |
"steps(
    number,
    "jump-start" |
    "jump-end" |
    "jump-end" |
    "jump-both" |
    "jump-none"
)" |
"cubic-bezier(
    number,
    number,
    number,
    number
)"
```
**On**:
```
{
    complete: number,
    task: () => void
}
```

The Flow-to state.

### start:
Type: `boolean | undefined`

A state variable is used to start or restart the animation.

### onStart:
Type: `() => void | undefined`

A function that is emited when animation is starting.

### onEnd:
Type: `() => void | undefined`

A function that is emited when animation is Completing.

## License

[MIT](https://github.com/JohnSoatra/any/blob/main/LICENSE)

