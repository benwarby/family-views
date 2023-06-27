import * as t from "io-ts";

export const TabInfoId = t.string;
export type TabInfoIdType = t.TypeOf<typeof TabInfoId>

export const BaseTabInfo = t.type({
    tabInfoId: TabInfoId,
    name: t.string,
    description: t.string
})

export const MarkdownTabInfo = t.intersection([
    BaseTabInfo,
    t.type({
        markdownContent:t.string,
        tagType: t.literal("markdown")
    })
])
export type MarkdownTabInfoType = t.TypeOf<typeof MarkdownTabInfo>

export const SystemContentTabInfo = t.intersection([
    BaseTabInfo,
    t.type({
        systemContent:t.string,
        tagType: t.literal("system")
    }),
])
export type SystemContentTabInfoType = t.TypeOf<typeof SystemContentTabInfo>

export const TabInfo = t.union([SystemContentTabInfo, MarkdownTabInfo])
export type TabInfoType = t.TypeOf<typeof TabInfo>