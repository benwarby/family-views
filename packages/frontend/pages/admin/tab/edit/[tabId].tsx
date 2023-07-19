import { useRouter } from "next/router";
import { AdminLayoutFn } from "../../../../components/admin/admin-layout";
import TabEditor from "../../../../components/admin/tab/tab-editor";
import {
  GetTabAPIEndpoint,
  GetTabRequest,
  TabInfoType,
} from "@family-views/common";
import { useEffect, useState } from "react";

import * as either from "fp-ts/Either";
import { callApiEndpoint } from "../../../../data-access/api-access";

export default function EditTab() {
  const router = useRouter();
  const tabId = router.query["tabId"];

  const [content, setContent] = useState<JSX.Element>(<>Loading...</>);

  useEffect(() => {
    console.log(tabId);
    if (tabId) {
      console.log("fetching");
      const isArray: boolean = Array.isArray(tabId);
      let tId: string;
      if (Array.isArray(tabId)) {
        tId = tabId[0];
      } else {
        tId = tabId;
      }
      const tabRequest: GetTabRequest = {
        tabId: tId,
      };

      callApiEndpoint(GetTabAPIEndpoint, tabRequest).then((result) => {
        const body = result.body;
        if (either.isLeft(body)) {
          console.log(`Error ${body.left}`);
        } else {
          const result: TabInfoType = body.right;
          setContent(
            <>
              <TabEditor tabToEdit={result} ></TabEditor>
            </>
          );
        }
      });
    }
  }, [tabId]);

  return (
    <>
      Tab Editor: {tabId}
      {content}
    </>
  );
}
EditTab.getLayout = AdminLayoutFn;
