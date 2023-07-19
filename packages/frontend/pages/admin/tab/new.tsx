import { TabInfoType, TabType } from "@family-views/common";
import { AdminLayoutFn } from "../../../components/admin/admin-layout";
import TabEditor from "../../../components/admin/tab/tab-editor";
import { ChangeEventHandler, useState } from "react";

export default function NewTab() {
  type OptionType = {
    key: string;
    value: string;
    displayValue: string;
  };

  const getOption = (option: OptionType) => {
    return (
      <option value={option.value} key={option.key}>
        {option.displayValue}
      </option>
    );
  };

  const optionList: OptionType[] = [
    { key: "unselected", value: "", displayValue: "" },
    {
      key: TabType.MARKDOWN,
      value: TabType.MARKDOWN,
      displayValue: "Markdown",
    },
    {
      key: TabType.GOOGLE_CALENDAR,
      value: TabType.GOOGLE_CALENDAR,
      displayValue: "Google Calendar",
    },
    {
      key: TabType.GOOGLE_DOC,
      value: TabType.GOOGLE_DOC,
      displayValue: "Google Doc",
    },
  ];

  const tabTypeChanged: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    let tab: TabInfoType | null = null;
    switch (value) {
      case TabType.MARKDOWN:
        tab = {
          tabInfoId: "",
          name: "",
          description: "",
          markdownContent: "",
          tagType: TabType.MARKDOWN,
        };
        break;
      case TabType.GOOGLE_CALENDAR:
        tab = {
          tabInfoId: "",
          name: "",
          description: "",
          calendarUrl: "",
          tagType: TabType.GOOGLE_CALENDAR,
        };
        break;

      case TabType.GOOGLE_DOC:
        tab = {
          tabInfoId: "",
          name: "",
          description: "",
          documentUrl: "",
          tagType: TabType.GOOGLE_DOC,
        };
      default:
        break;
    }
    if (tab) {
      setContent(<TabEditor tabToEdit={tab}></TabEditor>);
    }
  };

  const getSelect = () => {
    const select = (
      <label>
        Tab Type:{" "}
        <select id="tab-type" onChange={tabTypeChanged}>
          {optionList.map((option) => getOption(option))}
        </select>
      </label>
    );
    return select;
  };
  const [content, setContent] = useState<JSX.Element>(<>{getSelect()}</>);

  return (
    <>
      New Tab
      {content}
    </>
  );
}

NewTab.getLayout = AdminLayoutFn;
