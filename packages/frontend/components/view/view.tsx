import styles from "./view.module.css";

import { GetTabAPIEndpoint, ViewTabIdInfoType } from "@family-views/common";
import { useEffect, useState } from "react";
import ViewTabs, { ViewTabsData } from "./view-tabs";
import ViewTab from "./view-tab";
import { callApiEndpoint } from "../../data-access/api-access";
import * as either from "fp-ts/Either";

export default function ViewPage({
  viewInfo,
}: {
  viewInfo: ViewTabIdInfoType | null;
}) {
  const [currentTabId, setCurrentTabId] = useState("");
  const [tabData, setTabData] = useState<ViewTabsData[]>([]);

  const updateCurrentTab = (tabId: string) => {
    setCurrentTabId(tabId);
  };

  const getTabData = async (tabId: string) => {
    return await callApiEndpoint(GetTabAPIEndpoint, {
      tabId: tabId,
    });
  };

  const updateTabData = async () => {
    if (!viewInfo) {
      return;
    }

    let tabData: ViewTabsData[] = [];
    for (const tabId of viewInfo.tabIds) {
      console.log(`Getting tab: ${tabId}`);
      const tab = await getTabData(tabId);
      console.log(`Tab: ${JSON.stringify(tab)}`);

      if (either.isLeft(tab.body)) {
        console.log(`Error getting tab ${tabId} : ${tab.body.left}`);
      } else {
        tabData.push(tab.body.right);
      }
    }
    console.log(`Tab Data: ${JSON.stringify(tabData)}`);
    setTabData(tabData);

    if (!currentTabId) {
      console.log(`Setting current tab: ${tabData[0].tabInfoId}`);
      updateCurrentTab(tabData[0].tabInfoId);
    }
  };

  useEffect(() => {
    updateTabData();
  }, [viewInfo]);

  return (
    <div className={styles.view_section}>
      {viewInfo?.displayName ?? "Loading..."}
      <ViewTabs
        tabInfo={tabData}
        currentTabId={currentTabId}
        setCurrentTabId={updateCurrentTab}
      ></ViewTabs>
      <ViewTab tabId={currentTabId}></ViewTab>
    </div>
  );
}
