import * as t from "io-ts";

export const ViewInfoId = t.string;
export type ViewInfoIdType = t.TypeOf<typeof ViewInfoId>

export const ViewInfo = t.type({
    viewInfoId: ViewInfoId,
    displayName: t.string,
    description: t.string,
    tabTransitionInSeconds: t.number,
})
export type ViewInfoType = t.TypeOf<typeof ViewInfo>