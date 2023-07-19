import { useRouter } from "next/router";
import ViewEditor from "../../../../components/admin/view/view-editor";
import { useEffect, useState } from "react";
import { GetViewAPIEndpoint } from "@family-views/common";
import { callApiEndpoint } from "../../../../data-access/api-access";
import * as either from "fp-ts/Either";
import { AdminLayoutFn } from "../../../../components/admin/admin-layout";

export default function EditView() {
  const router = useRouter();
  const viewId = router.query["viewId"];
  const [content, setContent] = useState<JSX.Element>(<>Loading...</>);

  useEffect(() => {
    if (!viewId) {
      return;
    }

    const isArray: boolean = Array.isArray(viewId);
    let id: string;
    if (Array.isArray(viewId)) {
      id = viewId[0];
    } else {
      id = viewId;
    }

    callApiEndpoint(GetViewAPIEndpoint, { viewId }).then((response) => {
      if (either.isLeft(response.body)) {
        console.log(`Error ${response.body.left}`);
      } else {
        const view = response.body.right;

        setContent(
          <>
            <ViewEditor viewToEdit={view}></ViewEditor>
          </>
        );
      }
    });
  }, [viewId]);

  return <>{content}</>;
}

EditView.getLayout = AdminLayoutFn;
