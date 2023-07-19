import TabLinkBar, { TabLinkBarInfo } from "../tab-link-bar";

export default function AdminLinkBar() {
    const adminTabsInfo: TabLinkBarInfo[] = [
        {
          id: "view",
          displayName: "Views",
          href: "/admin/view"
        },
        {
          id: "tab",
          displayName: "Tabs",
          href: "/admin/tab"
        },
      ];
    return (<>
    <TabLinkBar tabBarInfo={adminTabsInfo}></TabLinkBar>
    </>)
}