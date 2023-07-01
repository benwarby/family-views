import { useEffect, useState } from "react";
import ViewsEditor from "./views-editor";
import TabBar, { TabBarInfo } from "../../components/tab-bar";

export default function Admin() {
  const adminTabsInfo: TabBarInfo[] = [
    {
      id: "view",
      displayName: "Views",
    },
    {
      id: "tab",
      displayName: "Tabs",
    },
  ];
  const [currentTabId, setCurrentTabId] = useState("");
  const [tabContent, setTabContent] = useState(<>Nothing</>);

  useEffect(() => {
    console.log(currentTabId);
    if (currentTabId === "view") {
      setTabContent(<ViewsEditor></ViewsEditor>);
    } else if (currentTabId === "tab") {
      setTabContent(<>Lets do tabs</>);
    } else {
      setTabContent(<>Unknown Admin Tab</>);
    }
  }, [currentTabId]);

  useEffect(() => {
    if (!currentTabId) {
      setCurrentTabId(adminTabsInfo[0].id);
    }
  });

  return (
    <>
      <TabBar
        tabBarInfo={adminTabsInfo}
        currentTabId={currentTabId}
        setCurrentTabId={setCurrentTabId}
      ></TabBar>
      {tabContent}
    </>
  );
}
