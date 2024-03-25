import Vars from "@/constants/vars";
import { ClassNameValue, Config, extendTailwindMerge } from "tailwind-merge";

function tailwindMerge(
    classLists: ClassNameValue[],
    configExtension?: Partial<Config> | ((config: Config) => Config),
    createConfig?: ((config: Config) => Config)[]
) {
    const classString = extendTailwindMerge(
        {
            ...(configExtension || {}),
            classGroups: {
                ...(((configExtension || {}) as Config).classGroups || {}),
                'ease': [
                    {
                        ease: Vars.All_Easings
                    }
                ]
            }
        },
        ...(createConfig || [])
    )(classLists);

    return Array.from(new Set(classString.split(' '))).join(' ');
}

export {
    tailwindMerge
}