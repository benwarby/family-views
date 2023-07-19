import { GetViewAPIEndpoint, ViewTabIdInfoType } from "@family-views/common";
import React, { useEffect, useState } from "react";
import * as either from "fp-ts/Either";
import ViewTabSelector from "./view-tab-selector";
import { callApiEndpoint } from "../../../data-access/api-access";

export default function ViewEditor({ viewId }: { viewId: string }) {
  const [viewInfo, setViewInfo] = useState<ViewTabIdInfoType | null>(null);

  const getUpdatedView = async () => {
    if (!viewId) {
      return;
    }
    callApiEndpoint(GetViewAPIEndpoint, { viewId: viewId }).then((result) => {
      const body = result.body;
      if (either.isRight(body)) {
        setViewInfo(body.right);
      } else {
        console.log(body.left);
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
      <p>hello</p>
      <ViewTabSelector
        view={viewInfo}
        viewUpdated={() => {
          getUpdatedView();
        }}
      ></ViewTabSelector>
    </>
  );
}
