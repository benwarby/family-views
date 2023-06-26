import { GetViewResponseType, ViewTabInfoType } from "@family-views/common";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as either from "fp-ts/Either";
import ViewPage from "../../../components/view/view";

export default function View() {
  const { data: session } = useSession();
  const router = useRouter();
  const viewId = router.query["viewId"];
  const [viewInfo, setViewInfo] = useState<ViewTabInfoType|null>(null)

  useEffect(() => {
    const fetchData = async () => {
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
            let view:ViewTabInfoType = result.right;
            setViewInfo(view)
          } else {
            //TODO: Display error.
          }
        });
    };
    fetchData();
  }, [viewId, ]);


  return (
    <>
      <ViewPage viewInfo={viewInfo}></ViewPage>
    </>
  );
}
