import {
  DeleteTabAPIEndpoint,
  GetAllTabsAPIEndpoint,
  TabInfoType,
} from "@family-views/common";
import { useSession } from "next-auth/react";
import { MouseEventHandler, useEffect, useState } from "react";
import styles from "./tabs-admin.module.css";
import * as either from "fp-ts/Either";
import { callApiEndpoint } from "../../../data-access/api-access";

export default function TabsAdmin() {
  const [tabsInfo, setTabsInfo] = useState<TabInfoType[]>();
  const { data: session } = useSession();
  const [tabElements, setTabElements] = useState<JSX.Element[]>([]);
  const [content, setContent] = useState<JSX.Element>(<>Loading.</>);

  const updateTabsInfo = async () => {
    callApiEndpoint(GetAllTabsAPIEndpoint, {}).then((result) => {
      const body = result.body;
      if (either.isLeft(body)) {
        console.log(`Error ${body.left}`);
      } else {
        let info: TabInfoType[] = body.right;
        setTabsInfo(info);
      }
    });
  };
  const tabListContent = (
    <>
      <ul>{tabElements}</ul>
      <button type="button">Add tab</button>
    </>
  );

  useEffect(() => {
    setContent(tabListContent);
    updateTabsInfo();
  }, [session]);

  const editTab: MouseEventHandler<HTMLSpanElement> = (e) => {
    const tabId = e.currentTarget.dataset.tabId;
    let tab = null;
    if (tabId) {
      tab = tabsInfo?.find((t) => t.tabInfoId === tabId) ?? null;
    }
    setContent(<>{/* <TabEditor tab={tab}></TabEditor> */}</>);
  };

  const deleteTab: MouseEventHandler<HTMLSpanElement> = (e) => {
    const tabId = e.currentTarget.dataset.tabId;
    console.log(tabId);
    if (tabId) {
      callApiEndpoint(DeleteTabAPIEndpoint, { tabId: tabId }).then((result) => {
        const body = result.body;
        if (either.isLeft(body)) {
          console.log(`Error deleting tab ${tabId}: ${body.left}`);
        } else {
          updateTabsInfo();
        }
      });
    }
  };

  useEffect(() => {
    if (!tabsInfo) {
      return;
    }
    let tabElements: JSX.Element[] = [];
    console.log(tabsInfo);
    tabsInfo.forEach((tabInfo) => {
      tabElements.push(
        <>
          <li className={styles.tabItem}>
            {tabInfo.name} - {tabInfo.tagType}
            <span onClick={editTab} data-tab-id={tabInfo.tabInfoId}>
              Edit
            </span>
            <span onClick={deleteTab} data-tab-id={tabInfo.tabInfoId}>
              Delete
            </span>
          </li>
        </>
      );
    });
    setTabElements(tabElements);
  }, [tabsInfo]);

  return <>{content}</>;
}
