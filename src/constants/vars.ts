import { Breakpoints, Easing, EasingStyle, EasingType, Jump } from "../types";

const Easings: EasingType = {
    Linear: "linear",
    StepStart: "stepStart",
    StepEnd: "stepEnd",
    Ease: "ease",
    EaseIn: "easeIn",
    EaseOut: "easeOut",
    EaseInOut: "easeInOut",
    SineIn: "sineIn",
    SineOut: "sineOut",
    SineInOut: "sineInOut",
    QuadIn: "quadIn",
    QuadOut: "quadOut",
    QuadInOut: "quadInOut",
    CubicIn: "cubicIn",
    CubicOut: "cubicOut",
    CubicInOut: "cubicInOut",
    QuartIn: "quartIn",
    QuartOut: "quartOut",
    QuartInOut: "quartInOut",
    QuintIn: "quintIn",
    QuintOut: "quintOut",
    QuintInOut: "quintInOut",
    ExpoIn: "expoIn",
    ExpoOut: "expoOut",
    ExpoInOut: "expoInOut",
    CircIn: "circIn",
    CircOut: "circOut",
    CircInOut: "circInOut",
    BackIn: "backIn",
    BackOut: "backOut",
    BackInOut: "backInOut",
    Cubic: (x1: number, y1: number, x2: number, y2: number) =>
        `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`,
    Steps: (n: number, jump: Jump) => `steps(${n}, ${jump})`,
};

function EasingsToStyle(easing: Easing): EasingStyle {
    switch (easing) {
        case "linear":
            return "linear";
        case "stepStart":
            return "step-start";
        case "stepEnd":
            return "step-end";
        case "easeIn":
            return "ease-in";
        case "easeOut":
            return "ease-out";
        case "easeInOut":
            return "ease-in-out";
        case "sineIn":
            return "cubic-bezier(0.47, 0, 0.745, 0.715)";
        case "sineOut":
            return "cubic-bezier(0.39, 0.575, 0.565, 1)";
        case "sineInOut":
            return "cubic-bezier(0.445, 0.05, 0.55, 0.95)";
        case "quadIn":
            return "cubic-bezier(0.55, 0.085, 0.68, 0.53)";
        case "quadOut":
            return "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        case "quadInOut":
            return "cubic-bezier(0.455, 0.03, 0.515, 0.955)";
        case "cubicIn":
            return "cubic-bezier(0.55, 0.055, 0.675, 0.19)";
        case "cubicOut":
            return "cubic-bezier(0.215, 0.61, 0.355, 1)";
        case "cubicInOut":
            return "cubic-bezier(0.645, 0.045, 0.355, 1)";
        case "quartIn":
            return "cubic-bezier(0.895, 0.03, 0.685, 0.22)";
        case "quartOut":
            return "cubic-bezier(0.165, 0.84, 0.44, 1)";
        case "quartInOut":
            return "cubic-bezier(0.77, 0, 0.175, 1)";
        case "quintIn":
            return "cubic-bezier(0.755, 0.05, 0.855, 0.06)";
        case "quintOut":
            return "cubic-bezier(0.23, 1, 0.32, 1)";
        case "quintInOut":
            return "cubic-bezier(0.86, 0, 0.07, 1)";
        case "expoIn":
            return "cubic-bezier(0.95, 0.05, 0.795, 0.035)";
        case "expoOut":
            return "cubic-bezier(0.19, 1, 0.22, 1)";
        case "expoInOut":
            return "cubic-bezier(1, 0, 0, 1)";
        case "circIn":
            return "cubic-bezier(0.6, 0.04, 0.98, 0.335)";
        case "circOut":
            return "cubic-bezier(0.075, 0.82, 0.165, 1)";
        case "circInOut":
            return "cubic-bezier(0.785, 0.135, 0.15, 0.86)";
        case "backIn":
            return "cubic-bezier(0.6, -0.28, 0.735, 0.045)";
        case "backOut":
            return "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        case "backInOut":
            return "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        default:
            return easing;
    }
}

const DefaultBreakpoints: Breakpoints = {
    sm: 400,
    md: 768,
    lg: 1024,
};

export { Easings, EasingsToStyle, DefaultBreakpoints };
