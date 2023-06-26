import styles from './view-tabs.module.css'

import { TabType } from "@family-views/common";

export default function ViewTabs({ tabInfo, currentTabId, setCurrentTabId }: { tabInfo: TabType[], currentTabId:string, setCurrentTabId: (tabId:string) => void }) {
    let clickItem = (tabId:string) => {
        setCurrentTabId(tabId)
    }
  let tabs = tabInfo.map((tab: TabType) => {
    let className:string = currentTabId === tab.tabInfoId ? styles.active_tab : ""
    return <li role="menuitem" key={tab.tabInfoId} onClick={(e) => clickItem(tab.tabInfoId)} className={className}>{tab.name}</li>;
  });

  return (
    <>
      <nav>
        <ul role="menubar">{tabs}</ul>
      </nav>
    </>
  );
}
