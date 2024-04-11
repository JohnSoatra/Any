import React, { useEffect, useRef, useState } from "react";
import type { AllTags, Breakpoints, To, Tos } from "../types";
import useReached from "../hooks/useReached";
import { TailwindMergeType, tailwindMerge } from "../utils/tailwind";
import {
    getDelay,
    getDuration,
    getEasing,
    getProperty,
    getTimeoutDelay,
} from "../utils/any";

type RemoveProps =
    | "from"
    | "to"
    | "children"
    | "dangerouslySetInnerHTML"
    | "as"
    | "start"
    | "instant"
    | "animatedProperties"
    | "style"
    | "mergeConfig"
    | "breakpoints"
    | "onStart"
    | "onComplete";

type SameProps_1 = {
    from: string;
    start?: boolean;
    instant?: boolean;
    animatedProperties?: [string, ...string[]];
    mergeConfig?: TailwindMergeType;
    onStart?: () => void;
    onComplete?: () => void;
};

type SameProps_2<B extends Breakpoints> =
    | (SameProps_1 & {
          breakpoints?: undefined;
          to: Tos<undefined>;
      })
    | (SameProps_1 & {
          breakpoints: B;
          to: Tos<B>;
      });

type Same_Props_3<B extends Breakpoints> =
    | (SameProps_2<B> & {
          children: React.ReactNode;
          dangerouslySetInnerHTML?: undefined;
      })
    | (SameProps_2<B> & {
          children?: undefined;
          dangerouslySetInnerHTML: { __html: string };
      });

type AnyProps<T extends AllTags, B extends Breakpoints> =
    | (Same_Props_3<B> &
          Omit<JSX.IntrinsicElements["div"], RemoveProps> & {
              as?: undefined;
          })
    | (Same_Props_3<B> &
          Omit<JSX.IntrinsicElements[T], RemoveProps> & {
              as: T;
          });

function animatedProps<B extends Breakpoints>({
    to,
    index,
    ended,
    breakpoints,
    animatedProperties,
}: {
    to: Tos<B>;
    index: number;
    ended: boolean;
    animatedProperties?: [string, ...string[]];
    breakpoints?: B;
}): React.HTMLAttributes<HTMLDivElement>["style"] {
    const property = getProperty(animatedProperties);
    const duration = getDuration({
        index,
        ended,
        to,
        breakpoints,
    });
    const easing = getEasing({
        index,
        ended,
        to,
        breakpoints,
    });
    const delay = getDelay({
        index,
        ended,
        to,
        breakpoints,
    });

    return {
        transitionProperty: property,
        msTransitionProperty: property,
        MozTransitionProperty: property,
        WebkitTransitionProperty: property,

        transitionDuration: duration + "ms",
        msTransitionDuration: duration + "ms",
        MozTransitionDuration: duration + "ms",
        WebkitTransitionDuration: duration + "ms",

        transitionDelay: delay + "ms",
        msTransitionDelay: delay + "ms",
        MozTransitionDelay: delay + "ms",
        WebkitTransitionDelay: delay + "ms",

        transitionTimingFunction: easing,
        MozTransitionTimingFunction: easing,
        WebkitTransitionTimingFunction: easing,
    };
}

const Any = function <T extends AllTags, B extends Breakpoints>({
    as,
    from,
    to,
    start,
    instant,
    breakpoints,
    animatedProperties,
    mergeConfig,
    onStart,
    onComplete,
    ...props
}: AnyProps<T, B>) {
    const [Tag]: ["div" | (() => JSX.Element), React.Dispatch<any>] = useState(
        as === undefined ? "div" : (as as any)
    );
    const [index, setIndex] = useState(-1);
    const [calledOnStart, setCalledOnStart] = useState(false);
    const [ended, setEnded] = useState(false);
    const [className, setClassName] = useState(from);
    const [animating, setAnimating] = useState(false);
    const ref = useRef(null);
    const isReached = useReached(ref);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (start === false) {
            setIndex(-1);
            setEnded(false);
            setClassName(from);

            if (
                (isReached || instant === true) &&
                ended === false &&
                index === -1 &&
                className === from
            ) {
                if (calledOnStart === false) {
                    setCalledOnStart(true);
                    onStart && onStart();
                }
            }
        } else {
            if (
                (isReached || instant === true) &&
                ended === false &&
                index === -1 &&
                className === from
            ) {
                if (calledOnStart === false) {
                    setCalledOnStart(true);
                    onStart && onStart();
                }
                if (window && ref.current) {
                    // use get computed style to await until component turn back to from
                    const tranProp = window.getComputedStyle(ref.current);

                    if (tranProp.transitionProperty) {
                        setIndex(0);
                        setAnimating(true);
                        setCalledOnStart(false);
                    }
                }
            }
        }
    }, [
        start,
        isReached,
        instant,
        ended,
        index,
        className,
        from,
        calledOnStart,
        onStart,
    ]);

    useEffect(() => {
        if (index > -1) {
            setClassName((className) =>
                tailwindMerge({
                    classLists: [props.className, className, to[index].state],
                    ...(mergeConfig || {}),
                })
            );
        }
    }, [index, to, mergeConfig]);

    useEffect(() => {
        let current: HTMLElement | null = null;

        const onTransitionStart = (evt: TransitionEvent) => {
            if (ref.current && evt.target === ref.current) {
                evt.stopImmediatePropagation();

                if (timeoutRef.current === undefined) {
                    clearTimeout(timeoutRef.current);
                    setAnimating(true);

                    timeoutRef.current = setTimeout(() => {
                        timeoutRef.current = undefined;

                        if (to[index].onEnd !== undefined) {
                            to[index].onEnd!();
                        }

                        if (
                            index < to.length - 1 &&
                            (to[index + 1] as To<B>).start !== false
                        ) {
                            setIndex(index + 1);
                            setAnimating(true);
                        }
                    }, getTimeoutDelay({ index, to, breakpoints }));
                }
            }
        };

        const onTransitionEnd = (evt: TransitionEvent) => {
            if (evt.target === ref.current) {
                evt.stopImmediatePropagation();

                if (index == to.length - 1 && timeoutRef.current === undefined) {
                    setEnded(true);
                    setAnimating(false);
                    onComplete && onComplete();
                }
            }
        };

        if (ref.current) {
            current = ref.current as HTMLElement;
            current.addEventListener("transitionstart", onTransitionStart);
            current.addEventListener("transitionend", onTransitionEnd);
        }

        return () => {
            if (current) {
                current.removeEventListener("transitionstart", onTransitionStart);
                current.removeEventListener("transitionend", onTransitionEnd);
            }
        };
    }, [index, to, onComplete]);

    useEffect(() => {
        if (
            animating === false &&
            index > -1 &&
            index < to.length - 1 &&
            (to[index + 1] as To<B>).start === true
        ) {
            setIndex(index + 1);
            setAnimating(true);
        }
    }, [animating, index, to]);

    return (
        <Tag
            {...(props as React.HTMLAttributes<HTMLDivElement>)}
            ref={ref}
            className={tailwindMerge({
                classLists: [
                    props.className,
                    className,
                    index > -1 && to[index].state,
                ],
                ...(mergeConfig || {}),
            })}
            style={animatedProps({
                to,
                index,
                ended,
                animatedProperties,
                breakpoints,
            })}
        />
    );
};

export default Any;
export type { AnyProps };
