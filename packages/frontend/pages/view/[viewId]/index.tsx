import { GetViewAPIEndpoint, ViewTabIdInfoType } from "@family-views/common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as either from "fp-ts/Either";
import ViewPage from "../../../components/view/view";
import { callApiEndpoint } from "../../../data-access/api-access";

export default function View() {
  const router = useRouter();
  const viewId = router.query["viewId"];
  const [viewInfo, setViewInfo] = useState<ViewTabIdInfoType | null>(null);

  useEffect(() => {
    console.log(viewId);
    if (!viewId || (viewInfo && viewInfo.viewInfoId === viewId)) {
      return;
    }
    console.log("fetching");
    const isArray: boolean = Array.isArray(viewId);
    let vId: string;
    if (Array.isArray(viewId)) {
      vId = viewId[0];
    } else {
      vId = viewId;
    }
    console.log(`id: ${vId}`);
    callApiEndpoint(GetViewAPIEndpoint, { viewId: vId }).then((result) => {
      console.log(JSON.stringify(result));
      const body = result.body;
      if (either.isLeft(body)) {
        console.log(`Error ${body.left}`);
      } else {
        const view: ViewTabIdInfoType = body.right;
        console.log(JSON.stringify(view));
        setViewInfo(view);
      }
    });
  }, [viewId]);

  return (
    <>
      <ViewPage viewInfo={viewInfo}></ViewPage>
    </>
  );
}
