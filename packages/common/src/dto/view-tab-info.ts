import * as t from "io-ts";
import { TabInfoId } from "./tab-info";
import { ViewInfo } from "./view-info";

export const ViewTabIdInfo = t.intersection([
  ViewInfo,
  t.type({
    tabIds: t.array(TabInfoId),
  }),
]);
export type ViewTabIdInfoType = t.TypeOf<typeof ViewTabIdInfo>;
