import styles from "./view-tabs.module.css";

import { TabInfoType } from "@family-views/common";

export default function ViewTabs({
  tabInfo,
  currentTabId,
  setCurrentTabId,
}: {
  tabInfo: TabInfoType[];
  currentTabId: string;
  setCurrentTabId: (tabId: string) => void;
}) {
  let clickItem = (tabId: string) => {
    setCurrentTabId(tabId);
  };
  let tabs = tabInfo.map((tab: TabInfoType) => {
    let className: string =
      currentTabId === tab.tabInfoId ? styles.active_tab : "";
    return (
      <li
        role="menuitem"
        key={tab.tabInfoId}
        onClick={(e) => clickItem(tab.tabInfoId)}
        className={className}
      >
        {tab.name}
      </li>
    );
  });

  return (
    <>
      <nav>
        <ul role="menubar">{tabs}</ul>
      </nav>
    </>
  );
}
