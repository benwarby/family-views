import { GoogleDocTabInfoType } from "@family-views/common";
import { ActionType, TabDispatch } from "./tab-editor";

export default function EditGoogleDocTab({
  tab,
  tabDispatch
}: {
  tab: GoogleDocTabInfoType;
  tabDispatch: TabDispatch;
}) {
  return (
    <>
      <p>Editing Google Doc Tab</p>
      <label>
       Document URL:
        <input
          id="document_url"
          type="text"
          defaultValue={tab.documentUrl}
          onChange={(e) => {
            tabDispatch({action:ActionType.UPDATE, fieldName: 'documentUrl', value: e.target.value})
          }}
          required
        ></input>
      </label>
    </>
  );
}
