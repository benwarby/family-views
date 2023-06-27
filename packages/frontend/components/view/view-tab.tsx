import {
  MarkdownTabInfoType,
  SystemContentTabInfoType,
  TabInfoType,
} from "@family-views/common";
import SystemView from "./system/system-view";
import ViewMarkdownTab from "./view-markdown-tab";

export default function ViewTab({
  tabInfo,
}: {
  tabInfo: TabInfoType | null | undefined;
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

    case "markdown":
      const markdownContentInfo = tabInfo as MarkdownTabInfoType;
      //TODO: Render it from markdown instead of the text.
      tabContent = <><ViewMarkdownTab tab={markdownContentInfo}></ViewMarkdownTab></>;
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
