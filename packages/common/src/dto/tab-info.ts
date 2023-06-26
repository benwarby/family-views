import * as t from "io-ts";

export const TabInfoId = t.string;
export type TabInfoIdType = t.TypeOf<typeof TabInfoId>

export const BaseTabInfo = t.type({
    tabInfoId: TabInfoId,
    name: t.string,
    description: t.string
})

export const DynamicTabInfo = t.intersection([
    BaseTabInfo,
    t.type({
        content:t.string,
        tagType: t.literal("dynamic")
    })
])
export type DynamicTabInfoType = t.TypeOf<typeof DynamicTabInfo>

// export type DynamicTabInfoType = UntaggedDynamicTabInfoType & { readonly tagType: "dynamic" }

// export const SYSTEM_CONTENT = ["schedule", "weekday-routine"] as const;

// function keyObject<T extends readonly string[]>(arr: T): { [K in T[number]]: null } {
//     return Object.fromEntries(arr.map(v => [v, null])) as any
// }

// export const SystemContent = t.keyof(keyObject(SYSTEM_CONTENT))

// export type SystemContentType = t.TypeOf<typeof SystemContent>

export const SystemContentTabInfo = t.intersection([
    BaseTabInfo,
    t.type({
        systemContent:t.string,
        tagType: t.literal("system")
    }),
])
export type SystemContentTabInfoType = t.TypeOf<typeof SystemContentTabInfo>
// export type SystemContentTabInfoType = UntaggedSystemContentTabInfoType & { readonly tagType: "system" }

export const TabInfo = t.union([SystemContentTabInfo, DynamicTabInfo])

// export type TabType = SystemContentTabInfoType | DynamicTabInfoType;
export type TabType = t.TypeOf<typeof TabInfo>