import {
  MarkdownTabInfoType,
  GoogleCalendarTabInfoType,
  GoogleDocTabInfoType,
  TabInfoType,
  GetTabAPIEndpoint,
} from "@family-views/common";
import ViewMarkdownTab from "./tab/view-markdown-tab";
import ViewGoogleCalendarTab from "./tab/view-google-calendar-tab";
import ViewGoogleDocTab from "./tab/view-google-doc-tab";
import { useEffect, useState } from "react";
import { callApiEndpoint } from "../../data-access/api-access";
import * as either from "fp-ts/Either";

export default function ViewTab({
  tabId,
}: {
  tabId: string | null | undefined;
}) {
  const [content, setContent] = useState<JSX.Element>(<>Tab not found.</>);

  const updateContent = (tabInfo: TabInfoType) => {
    switch (tabInfo.tagType) {
      case "google-calendar":
        setContent(
          <>
            <ViewGoogleCalendarTab
              tab={tabInfo as GoogleCalendarTabInfoType}
            ></ViewGoogleCalendarTab>{" "}
          </>
        );
        break;
      case "google-doc":
        setContent(
          <>
            <ViewGoogleDocTab
              tab={tabInfo as GoogleDocTabInfoType}
            ></ViewGoogleDocTab>{" "}
          </>
        );
        break;

      case "markdown":
        //TODO: Render it from markdown instead of the text.
        setContent(
          <>
            <ViewMarkdownTab
              tab={tabInfo as MarkdownTabInfoType}
            ></ViewMarkdownTab>
          </>
        );
        break;

      default:
        setContent(<>It's unknown content.</>);
        break;
    }
  };
  useEffect(() => {
    console.log(`TabID: ${tabId}`);
    if (!tabId) {
      setContent(<>Tab info not found.</>);
    } else {
      callApiEndpoint(GetTabAPIEndpoint, { tabId: tabId }).then((result) => {
        const body = result.body;
        if (either.isLeft(body)) {
          console.log(`Error ${body.left}`);
        } else {
          const tab: TabInfoType = body.right;
          updateContent(tab);
        }
      });
    }
  }, [tabId]);

  return <>{content}</>;
}
