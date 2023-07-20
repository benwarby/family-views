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
  const [timer, setTimer] = useState<NodeJS.Timer|null>(null);
  const [timerInterval] = useState<number>(viewInfo?.tabTransitionInSeconds ?? 0);

  const updateCurrentTab = (tabId: string) => {
    setCurrentTabId(tabId);
    // console.log(`Tag updated to ${currentTabId}, should be ${tabId}`)
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
      const tabId = tabData[0].tabInfoId;
      console.log(`Setting current tab: ${tabId}`);
      updateCurrentTab(tabId);
    }
  };

  useEffect(() => {
    updateTabData();
  }, [viewInfo]);

  useEffect(() => {
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
    if (viewInfo && viewInfo.tabTransitionInSeconds && viewInfo.tabTransitionInSeconds > 0) {
      const t:NodeJS.Timer = setInterval(() => {
        console.log('time')
        if (viewInfo && viewInfo.tabIds.length > 1) {
          const currentIndex = viewInfo.tabIds.indexOf(currentTabId)
          console.log(`${currentTabId} - ${currentIndex}`)
          if (currentIndex > viewInfo.tabIds.length - 2) {
            console.log('Updating current tab to first tab.')
            updateCurrentTab(viewInfo.tabIds[0])
          } else {
            console.log('updating current tab to next tab.')
            updateCurrentTab(viewInfo.tabIds[currentIndex+1])
          }
        }
      }, viewInfo.tabTransitionInSeconds * 1000)
      setTimer(t)
    }
  }, [timerInterval, currentTabId])

  // useEffect(() => {
  //   const interval:NodeJS.Timer = setInterval(() => {
  //     // setTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

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
