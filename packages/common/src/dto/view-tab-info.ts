import * as t from "io-ts";
import { BaseTabInfo, TabInfo, TabInfoId } from "./tab-info";
import {  ViewInfo } from "./view-info";

export const ViewTabInfo = t.intersection([
    ViewInfo,
    t.type({
        tabs: t.array(TabInfo)
    }
)])
export type ViewTabInfoType = t.TypeOf<typeof ViewTabInfo>

export const ViewTabIdInfo = t.intersection([
    ViewInfo,
    t.type({
       tabIds: t.array(TabInfoId) 
    })
])
export type ViewTabIdInfoType = t.TypeOf<typeof ViewTabIdInfo>