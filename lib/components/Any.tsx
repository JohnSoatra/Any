import React, { useEffect, useRef, useState } from 'react';
import type { Easing, To, ToNoStart } from '../types';
import { tailwindMerge } from '../utils/tailwind';
import useReached from '../hooks/useReached';
import { Config } from 'tailwind-merge';

type Tags = keyof JSX.IntrinsicElements;

type RemoveProps = 'from'|'to'|'children'|'dangerouslySetInnerHTML'|'as'|'start'|'onStart'|'onComplete'|'property'
    |'style'|'mergeConfigExtension'|'mergeCreateConfig';

type DefaultProps<T extends Tags> = {
    from: string,
    to: [ToNoStart, ...To[]],
    children: React.ReactNode,
    dangerouslySetInnerHTML?: undefined,
    as: T,
    start?: boolean,
    animatedProperties?: [string, ...string[]],
    instant?: boolean,
    mergeConfigExtension?: Partial<Config> | ((config: Config) => Config),
    mergeCreateConfig?: ((config: Config) => Config)[],
    onStart?: () => void,
    onComplete?: () => void,
}| {
    from: string,
    to: [ToNoStart, ...To[]],
    children?: undefined,
    dangerouslySetInnerHTML: { __html: string }
    as: T,
    start?: boolean,
    animatedProperties?: [string, ...string[]],
    instant?: boolean,
    mergeConfigExtension?: Partial<Config> | ((config: Config) => Config),
    mergeCreateConfig?: ((config: Config) => Config)[],
    onStart?: () => void,
    onComplete?: () => void,
}

type PropsWithTag<T extends Tags> = Omit<JSX.IntrinsicElements[T], RemoveProps> & DefaultProps<T>;

type PropsNoTag<T extends Tags> = Omit<JSX.IntrinsicElements['div'], RemoveProps> & Omit<DefaultProps<T>, 'as'> & {
    as?: undefined
}

type Props<T extends Tags> = PropsWithTag<T>|PropsNoTag<T>;

type AnimatedProps = {
    className: string,
    duration: number,
    delay: number,
    animatedProperties?: [string, ...string[]]
}

// this function let tailwind knows how to create easing classes
function EasingClass(easing: Easing): `ease-${Easing}` {
    switch (easing) {
        case 'in': return 'ease-in';
        case 'in-out': return 'ease-in-out';
        case 'linear': return 'ease-linear';
        case 'out':  return 'ease-out';
        case 'inSine': return 'ease-inSine';
        case 'outSine': return 'ease-outSine';
        case 'inOutSine': return 'ease-inOutSine';
        case 'inQuad': return 'ease-inQuad';
        case 'outQuad': return 'ease-outQuad';
        case 'inOutQuad': return 'ease-inOutQuad';
        case 'inCubic': return 'ease-inCubic';
        case 'outCubic': return 'ease-outCubic';
        case 'inOutCubic': return 'ease-inOutCubic';
        case 'inQuart': return 'ease-inQuart';
        case 'outQuart': return 'ease-outQuart';
        case 'inOutQuart': return 'ease-inOutQuart';
        case 'inQuint': return 'ease-inQuint';
        case 'outQuint': return 'ease-outQuint';
        case 'inOutQuint': return 'ease-inOutQuint';
        case 'inExpo': return 'ease-inExpo';
        case 'outExpo': return 'ease-outExpo';
        case 'inOutExpo': return 'ease-inOutExpo';
        case 'inCirc': return 'ease-inCirc';
        case 'outCirc': return 'ease-outCirc';
        case 'inOutCirc': return 'ease-inOutCirc';
        case 'inBack': return 'ease-inBack';
        case 'outBack': return 'ease-outBack';
        case 'inOutBack': return 'ease-inOutBack';
    }
}

function animatedProps({
    className,
    duration,
    delay,
    animatedProperties
}: AnimatedProps): React.HTMLAttributes<HTMLDivElement> {
    const property = (animatedProperties !== undefined && animatedProperties.length > 0) ? animatedProperties.join(',') : 'all';

    return ({
        className: className,
        style: {
            transitionProperty: property,
            msTransitionProperty: property,
            MozTransitionProperty: property,
            WebkitTransitionProperty: property,

            transitionDuration: duration + 'ms',
            msTransitionDuration: duration + 'ms',
            MozTransitionDuration: duration + 'ms',
            WebkitTransitionDuration: duration + 'ms',

            transitionDelay: delay + 'ms',
            msTransitionDelay: delay + 'ms',
            MozTransitionDelay: delay + 'ms',
            WebkitTransitionDelay: delay + 'ms',
        }
    });
}

const Any = function<T extends Tags>({
    from,
    to,
    start,
    as,
    instant,
    animatedProperties,
    mergeConfigExtension,
    mergeCreateConfig,
    onStart,
    onComplete,
    ...props
}: Props<T>) {
    const [Tag]: ['div' | (() => JSX.Element), React.Dispatch<any>] = useState(as === undefined ? 'div' : as as any);
    const [index, setIndex] = useState(-1);
    const [calledOnStart, setCalledOnStart] = useState(false);
    const [ended, setEnded] = useState(false);
    const [className, setClassName] = useState(from);
    const [startProperty, setStartProperty] = useState(null as null|string);
    const [animating, setAnimating] = useState(false);
    const ref = useRef(null);
    const isReached = useReached(ref);

    useEffect(() => {
        if (start === false) {
            setIndex(-1);
            setEnded(false);
            setClassName(from);

            if ((isReached || instant === true) && ended === false && index === -1 && className === from) {
                if (calledOnStart === false) {
                    setCalledOnStart(true);
                    onStart && onStart();
                }
            }
        } else { 
            if ((isReached || instant === true) && ended === false && index === -1 && className === from) {
                if (calledOnStart === false) {
                    setCalledOnStart(true);
                    onStart && onStart();
                }
                if (window && ref.current) {
                    // use get computed style to await until component turn back to from
                    const tranProp = window.getComputedStyle(ref.current);

                    if (tranProp.transitionProperty) {
                        setCalledOnStart(false);
                        setIndex(0);
                        setAnimating(true);
                    }
                }
            }
        }
    }, [start, isReached, instant, ended, index, className, from, calledOnStart, onStart]);

    useEffect(() => {
        if (index > -1) {
            setClassName(className =>
                tailwindMerge(
                    [
                        className,
                        to[index].state,
                        EasingClass(to[index].easing)
                    ],
                    mergeConfigExtension,
                    mergeCreateConfig
                )
            );
        }
    }, [index, to, mergeConfigExtension, mergeCreateConfig]);

    useEffect(() => {
        let current: HTMLElement|null = null;
        let tempStartProperty: string;
        
        const onTransitionStart = (evt: TransitionEvent) => {
            tempStartProperty = evt.propertyName;
            setStartProperty(evt.propertyName);
            setAnimating(true);
        }

        const onTransitionEnd = (evt: TransitionEvent) => {
            if (evt.propertyName === tempStartProperty || evt.propertyName === startProperty) {
                if (index > -1 && to[index] && to[index].onEnd) {
                    to[index].onEnd!();
                }
                if (index < to.length - 1) {
                    if (index === -1) {
                        setIndex(index + 1);
                        setAnimating(true);
                    } else {
                        if ((to[index + 1] as To).start !== false) {
                            setIndex(index + 1);
                            setAnimating(true);
                        } else {
                            setAnimating(false);
                        }
                    }
                } else {
                    setEnded(true);
                    setAnimating(false);
                    onComplete && onComplete();
                }
            }
        }

        if (ref.current) {
            current = ref.current as HTMLElement;
            current.addEventListener('transitionstart', onTransitionStart);
            current.addEventListener('transitionend', onTransitionEnd);
        }

        return () => {
            if (current) {
                current.removeEventListener('transitionstart', onTransitionStart);
                current.removeEventListener('transitionend', onTransitionEnd);
            };
        }
    }, [startProperty, index, to, onComplete]);

    useEffect(() => {
        if (animating === false && index > -1 && index < to.length - 1) {
            if ((to[index + 1] as To).start === true) {
                setIndex(index + 1);
                setAnimating(true);
            }
        }
    }, [animating, index, to]);

    return (
        <Tag
            {...props}
            {
                ...animatedProps({
                    className: tailwindMerge(
                        [
                            props.className,
                            className
                        ],
                        mergeConfigExtension,
                        mergeCreateConfig
                    ),
                    duration: (index === -1 || ended === true) ? 0 : to[index].duration,
                    delay: (index === -1 || ended === true) ? 0 : (to[index].delay || 0),
                    animatedProperties: animatedProperties
                })
            }
            ref={ref}
        />
    );
}

export default Any;