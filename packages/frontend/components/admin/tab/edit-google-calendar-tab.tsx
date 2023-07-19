import { GoogleCalendarTabInfoType } from "@family-views/common";
import { ActionType, TabDispatch } from "./tab-editor";

export default function EditGoogleCalendarTab({
  tab,
  tabDispatch
}: {
  tab: GoogleCalendarTabInfoType;
  tabDispatch: TabDispatch;
}) {
  return (
    <>
      <p>Editing Google Calendar Tab</p>
      <label>
        Calendar URL:{" "}
        <input
          id="calendar_url"
          type="text"
          defaultValue={tab.calendarUrl}
          onChange={(e) => {
            tabDispatch({action:ActionType.UPDATE, fieldName: 'calendarUrl', value: e.target.value})
          }}
          required
        ></input>
      </label>
    </>
  );
}
