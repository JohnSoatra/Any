import { DefaultBreakpoints, EasingsToStyle } from "../constants/vars";
import {
    AllValueBreakpoints,
    Breakpoints,
    EasingStyle,
    To,
    Tos,
} from "../types";

function getCurrentBreakpoints<B extends Breakpoints>({
    breakpoints,
    valueBreakpoints,
}: {
    valueBreakpoints: AllValueBreakpoints<B>;
    breakpoints?: B;
}): keyof AllValueBreakpoints<B> | null {
    if (window) {
        const windowWidth = window.innerWidth;
        const allBreakpoints = {
            ...DefaultBreakpoints,
            ...(breakpoints || {}),
        };
        let point: keyof AllValueBreakpoints<B> | null = null;

        for (let key in valueBreakpoints) {
            if (
                allBreakpoints[key] !== undefined &&
                allBreakpoints[key] <= windowWidth &&
                (point === null ||
                    allBreakpoints[key] >
                        allBreakpoints[point as keyof Breakpoints])
            ) {
                point = key as keyof AllValueBreakpoints<B>;
            }
        }

        return point;
    }

    return null;
}

function getProperty(animatedProperties?: [string, ...string[]]) {
    if (animatedProperties !== undefined) {
        return animatedProperties.join(",");
    }

    return "all";
}

function getDuration<B extends Breakpoints>({
    index,
    ended,
    to,
    breakpoints,
}: {
    index: number;
    ended: boolean;
    to: Tos<B>;
    breakpoints?: B;
}): number {
    if (index === -1 || ended === true) {
        return 0;
    }

    const duration = to[index].duration;

    if (typeof duration === "number") {
        return duration;
    }

    const point = getCurrentBreakpoints({
        breakpoints,
        valueBreakpoints: duration,
    });

    if (point !== null) {
        const _duration = duration[point];

        if (_duration === undefined) {
            throw Error("duration cannot be undefined.");
        }

        return _duration;
    }

    return duration["xs"];
}

function getDelay<B extends Breakpoints>({
    index,
    ended,
    to,
    breakpoints,
}: {
    index: number;
    ended: boolean;
    to: Tos<B>;
    breakpoints?: B;
}): number {
    if (index === -1 || ended === true) {
        return 0;
    }

    const delay = to[index].delay;

    if (delay === undefined) {
        return 0;
    }

    if (typeof delay === "number") {
        return delay;
    }

    const point = getCurrentBreakpoints({
        breakpoints,
        valueBreakpoints: delay,
    });

    if (point !== null) {
        return delay[point] || 0;
    }

    return delay["xs"] || 0;
}

function getEasing<B extends Breakpoints>({
    index,
    ended,
    to,
    breakpoints,
}: {
    index: number;
    ended: boolean;
    to: Tos<B>;
    breakpoints?: B;
}): EasingStyle | undefined {
    if (index === -1 || ended === true) {
        return undefined;
    }

    const easing = to[index].easing;

    if (typeof easing === "string") {
        return EasingsToStyle(easing);
    }

    const point = getCurrentBreakpoints({
        breakpoints,
        valueBreakpoints: easing,
    });

    if (point !== null) {
        const _easing = easing[point];

        if (_easing === undefined) {
            throw Error("easing cannot be undefined.");
        }

        return EasingsToStyle(_easing);
    }

    return EasingsToStyle(easing["xs"]);
}

function getTimeoutDelay<B extends Breakpoints>({
    index,
    to,
    breakpoints,
}: {
    index: number;
    to: Tos<B>;
    breakpoints?: B;
}): number {
    if (index === -1) {
        return 0;
    }

    const after =
        index < to.length - 1 ? (to[index + 1] as To<B>).after : undefined;
    const duration = to[index].duration;
    let durationNumber: number;

    if (typeof duration === "number") {
        durationNumber = duration;
    } else {
        const point = getCurrentBreakpoints({
            breakpoints,
            valueBreakpoints: duration,
        });

        if (point !== null) {
            const _duration = duration[point];

            if (_duration === undefined) {
                throw Error("duration cannot be undefined.");
            }

            durationNumber = _duration;
        } else {
            durationNumber = duration["xs"];
        }
    }

    if (after === undefined || after <= 0) {
        return durationNumber;
    } else if (after > 1) {
        return durationNumber;
    }

    return after * durationNumber;
}

export { getProperty, getDuration, getEasing, getDelay, getTimeoutDelay };
