import * as t from "io-ts";

export const TabInfoId = t.string;
export type TabInfoIdType = t.TypeOf<typeof TabInfoId>;

export const BaseTabInfo = t.type({
  name: t.string,
  description: t.string,
});
export type BaseTabInfoType = t.TypeOf<typeof BaseTabInfo>;

export const SavedTabInfo = t.intersection([
  BaseTabInfo,
  t.type({
    tabInfoId: TabInfoId,
  }),
]);
export type SavedTabInfoType = t.TypeOf<typeof SavedTabInfo>;

export enum TabType {
  MARKDOWN = "markdown",
  GOOGLE_CALENDAR = "google-calendar",
  GOOGLE_DOC = "google-doc",
}

export const MarkdownTabInfo = t.intersection([
  SavedTabInfo,
  t.type({
    markdownContent: t.string,
    tagType: t.literal(TabType.MARKDOWN),
  }),
]);
export type MarkdownTabInfoType = t.TypeOf<typeof MarkdownTabInfo>;

export const GoogleCalendarTabInfo = t.intersection([
  SavedTabInfo,
  t.type({
    calendarUrl: t.string,
    tagType: t.literal(TabType.GOOGLE_CALENDAR),
  }),
]);
export type GoogleCalendarTabInfoType = t.TypeOf<typeof GoogleCalendarTabInfo>;

export const GoogleDocTabInfo = t.intersection([
  SavedTabInfo,
  t.type({
    documentUrl: t.string,
    tagType: t.literal(TabType.GOOGLE_DOC),
  }),
]);
export type GoogleDocTabInfoType = t.TypeOf<typeof GoogleDocTabInfo>;

export const TabInfo = t.union([
  MarkdownTabInfo,
  GoogleCalendarTabInfo,
  GoogleDocTabInfo,
]);
export type TabInfoType = t.TypeOf<typeof TabInfo>;
