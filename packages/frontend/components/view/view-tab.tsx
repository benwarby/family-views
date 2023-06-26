import {
  DynamicTabInfoType,
  SystemContentTabInfoType,
  TabType,
} from "@family-views/common";
import SystemView from "./system/system-view";

export default function ViewTab({
  tabInfo,
}: {
  tabInfo: TabType | null | undefined;
}) {
  if (!tabInfo) {
    return <>No tab.</>;
  }

  let tabContent: JSX.Element = <>Tab not found.</>;

  switch (tabInfo.tagType) {
    case "system":
      const systemContentInfo = tabInfo as SystemContentTabInfoType;
      tabContent = (
        <>
          <SystemView
            systemContent={systemContentInfo.systemContent}
          ></SystemView>{" "}
        </>
      );
      break;

    case "dynamic":
      const dynamicContentInfo = tabInfo as DynamicTabInfoType;
      tabContent = <>{dynamicContentInfo.content}</>;
      break;

    default:
      tabContent = <>It's unknown content.</>;
      break;
  }

  return (
    <>
      {/* <p>{tabInfo ? tabInfo.description : "Tab not found"}</p> */}
      {tabContent}
    </>
  );
}
