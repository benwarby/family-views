import { GoogleCalendarTabInfoType } from "@family-views/common";

export default function ViewGoogleCalendarTab({
  tab,
}: {
  tab: GoogleCalendarTabInfoType;
}) {
  return <>Google Calendar: {tab.calendarUrl}</>;
}
