import {
  GetViewResponseType,
  ViewTabInfoType,
} from "@family-views/common";
import React, { useEffect, useState } from "react";
import * as either from "fp-ts/Either";
import ViewTabSelector from "./view-tab-selector";

export default function ViewEditor({ viewId }: { viewId: string }) {
  const [viewInfo, setViewInfo] = useState<ViewTabInfoType | null>(null);

  const getUpdatedView = async () => {
    if (!viewId) {
      return;
    }
    const url: string = `/api/view/${viewId}`;
    fetch(url, {
      method: "GET",
    })
      .then((result) => {
        return result.json();
      })
      .then((result: GetViewResponseType) => {
        if (either.isRight(result)) {
          let view: ViewTabInfoType = result.right;
          setViewInfo(view);
        } else {
          //TODO: Display error.
        }
      });
  };

  useEffect(() => {
    getUpdatedView();
  }, [viewId]);

  if (viewId === "" || viewId === "empty") {
    return <div>Please select a view to edit.</div>;
  }

  return (
    <>
      <h1>Edit view {viewId}</h1>
      {viewInfo?.displayName}
      <br />
      {/* <TabsSelector tabs={tabsInfo} updateChecked={updateChecked}></TabsSelector> */}
      <p>hello</p>
      <ViewTabSelector view={viewInfo} viewUpdated={() => {getUpdatedView()}}></ViewTabSelector>
    </>
  );
}
