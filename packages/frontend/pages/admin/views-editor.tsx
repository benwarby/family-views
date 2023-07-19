import { GetAllViewsAPIEndpoint, ViewInfoType } from "@family-views/common";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ViewEditor from "../../components/admin/view/view-editor";
import { AdminLayoutFn } from "../../components/admin/admin-layout";
import { callApiEndpoint } from "../../data-access/api-access";
import * as either from "fp-ts/Either";

export default function ViewsEditor() {
  const { data: session } = useSession();
  const [options, setOptions] = useState<JSX.Element[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("empty");

  useEffect(() => {
    callApiEndpoint(GetAllViewsAPIEndpoint, {}).then((result) => {
      const body = result.body;
      if (either.isLeft(body)) {
        console.log(`Error ${body.left}`);
      } else {
        const result = body.right;
        setOptions(
          result.map((viewInfo: ViewInfoType) => (
            <option value={viewInfo.viewInfoId} key={viewInfo.viewInfoId}>
              {viewInfo.displayName}
            </option>
          ))
        );
      }
    });
  }, [session]);

  return (
    <div>
      <form>
        <label>
          Select a view to edit:
          <select
            id="view"
            onChange={(e) => {
              const value = e.target.selectedOptions[0].value;
              setSelectedOption(value);
            }}
          >
            <option key="empty" value="empty"></option>
            <option key="new" value="new">
              New View
            </option>
            {options}
          </select>
        </label>
      </form>
      <ViewEditor viewId={selectedOption}></ViewEditor>
    </div>
  );
}

ViewsEditor.getLayout = AdminLayoutFn;
