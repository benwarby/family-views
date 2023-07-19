import * as t from "io-ts";

export const ViewInfoId = t.string;
export type ViewInfoIdType = t.TypeOf<typeof ViewInfoId>

export const ViewInfo = t.type({
    viewInfoId: ViewInfoId,
    displayName: t.string,
    description: t.string
})
export type ViewInfoType = t.TypeOf<typeof ViewInfo>