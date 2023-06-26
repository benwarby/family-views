import styles from './view.module.css'

import { ViewTabInfoType } from "@family-views/common";
import { useEffect, useState } from "react";
import ViewTabs from "./view-tabs";
import ViewTab from "./view-tab";

export default function ViewPage({
  viewInfo,
}: {
  viewInfo: ViewTabInfoType | null;
}) {
  const [currentTabId, setCurrentTabId] = useState("");

  const updateCurrentTab = (tabId: string) => {
    setCurrentTabId(tabId);
  };

  if (!viewInfo) {
    return <>Nope, not today.</>;
  }

  if (viewInfo && !currentTabId) {
    setCurrentTabId(viewInfo.tabs[0].tabInfoId);
  }

  return (
    <div className={styles.view_section}>
      {viewInfo.displayName}
      <ViewTabs
        tabInfo={viewInfo.tabs}
        currentTabId={currentTabId}
        setCurrentTabId={updateCurrentTab}
      ></ViewTabs>
      <ViewTab
        tabInfo={viewInfo.tabs.find((t) => t.tabInfoId === currentTabId)}
      ></ViewTab>
    </div>
  );
}
