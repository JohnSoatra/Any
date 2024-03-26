export type TestProps = {
    name: string
}
export type EasingType = 'Sine'|'Quad'|'Cubic'|'Quart'|'Quint'|'Expo'|'Circ'|'Back';

export type Easing = 'in'|'out'|'in-out'|'linear'|`in${EasingType}`|`out${EasingType}`|`inOut${EasingType}`;

export type ToNoStart = {
    state: string,
    duration: number,
    delay?: number,
    easing: Easing,
    onEnd?: () => void,
}

export type To = ToNoStart & {
    start?: boolean
}