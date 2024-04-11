import {
    ClassNameValue,
    Config,
    DefaultClassGroupIds,
    DefaultThemeGroupIds,
    extendTailwindMerge,
} from "tailwind-merge";

/* 
    All types here are from tailwind-merge library
*/

type GenericClassGroupIds = string;

type GenericThemeGroupIds = string;

type NoInfer<T> = [T][T extends any ? 0 : never];

type GenericConfig = Config<GenericClassGroupIds, GenericThemeGroupIds>;

type CreateConfigSubsequent = (config: GenericConfig) => GenericConfig;

type ClassValidator = (classPart: string) => boolean;

type ClassGroup<ThemeGroupIds extends string> =
    readonly ClassDefinition<ThemeGroupIds>[];

type ThemeObject<ThemeGroupIds extends string> = Record<
    ThemeGroupIds,
    ClassGroup<ThemeGroupIds>
>;

interface ThemeGetter {
    (
        theme: ThemeObject<GenericThemeGroupIds>
    ): ClassGroup<GenericClassGroupIds>;
    isThemeGetter: true;
}

type ClassDefinition<ThemeGroupIds extends string> =
    | string
    | ClassValidator
    | ThemeGetter
    | ClassObject<ThemeGroupIds>;

type ClassObject<ThemeGroupIds extends string> = Record<
    string,
    readonly ClassDefinition<ThemeGroupIds>[]
>;

interface ConfigGroups<
    ClassGroupIds extends string,
    ThemeGroupIds extends string
> {
    theme: NoInfer<ThemeObject<ThemeGroupIds>>;
    classGroups: NoInfer<Record<ClassGroupIds, ClassGroup<ThemeGroupIds>>>;
    conflictingClassGroups: NoInfer<
        Partial<Record<ClassGroupIds, readonly ClassGroupIds[]>>
    >;
    conflictingClassGroupModifiers: NoInfer<
        Partial<Record<ClassGroupIds, readonly ClassGroupIds[]>>
    >;
}

interface ConfigStatic {
    cacheSize: number;
    prefix?: string;
    separator: string;
}

type PartialPartial<T> = {
    [P in keyof T]?: Partial<T[P]>;
};

interface ConfigExtension<
    ClassGroupIds extends string,
    ThemeGroupIds extends string
> extends Partial<ConfigStatic> {
    override?: PartialPartial<ConfigGroups<ClassGroupIds, ThemeGroupIds>>;
    extend?: PartialPartial<ConfigGroups<ClassGroupIds, ThemeGroupIds>>;
}

type TailwindMergeType<
    AdditionalClassGroupIds extends string = never,
    AdditionalThemeGroupIds extends string = never
> = {
    configExtension?:
        | ConfigExtension<
              DefaultClassGroupIds | AdditionalClassGroupIds,
              DefaultThemeGroupIds | AdditionalThemeGroupIds
          >
        | CreateConfigSubsequent;
    createConfig?: CreateConfigSubsequent[];
};

type Props<
    AdditionalClassGroupIds extends string = never,
    AdditionalThemeGroupIds extends string = never
> = TailwindMergeType<AdditionalClassGroupIds, AdditionalThemeGroupIds> & {
    classLists: ClassNameValue[];
};

function tailwindMerge<
    AdditionalClassGroupIds extends string = never,
    AdditionalThemeGroupIds extends string = never
>({
    classLists,
    configExtension,
    createConfig,
}: Props<AdditionalClassGroupIds, AdditionalThemeGroupIds>): string {
    const classString = extendTailwindMerge(
        configExtension || {},
        ...(createConfig || [])
    )(classLists);

    return Array.from(new Set(classString.split(" "))).join(" ");
}

export {
    tailwindMerge,
    type TailwindMergeType
};
