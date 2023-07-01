import styles from "./tab-bar.module.css";
import "./tab-bar.module.css";

export type TabBarInfo = {
  id: string;
  displayName: string;
};

export default function TabBar({
  tabBarInfo,
  currentTabId,
  setCurrentTabId,
}: {
  tabBarInfo: TabBarInfo[];
  currentTabId: string;
  setCurrentTabId: (tabId: string) => void;
}) {
  let clickItem = (tabId: string) => {
    setCurrentTabId(tabId);
  };
  let tabs = tabBarInfo.map((tab: TabBarInfo) => {
    let className: string = currentTabId === tab.id ? styles.active_tab : "";
    return (
      <li
        role="menuitem"
        key={tab.id}
        onClick={(e) => clickItem(tab.id)}
        className={className}
      >
        {tab.displayName}
      </li>
    );
  });

  return (
    <>
      <div className={styles.tab_bar}>
        <nav>
          <ul role="menubar">{tabs}</ul>
        </nav>
      </div>
    </>
  );
}
