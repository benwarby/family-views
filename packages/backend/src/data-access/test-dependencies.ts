import {
  TabInfoType,
  TabType,
  MarkdownTabInfoType,
  GoogleCalendarTabInfoType,
  GoogleDocTabInfoType,
  ItemNotFoundError,
  InUseError,
  ViewTabIdInfoType,
} from "@family-views/common";
import { randomUUID } from "crypto";
import { DataAccessDependencies } from "./dependencies";
import { TabRepository } from "./tab-data-access";
import { ViewRepository } from "./view-data-access";

export const testTabRepository: TabRepository = (function () {
  let tabs: TabInfoType[] = [
    {
      tabInfoId: "1",
      name: "First tab",
      description: "This is the first tab",
      markdownContent: "# Hello, *world*!",
      tagType: TabType.MARKDOWN,
    },
    {
      tabInfoId: "2",
      name: "Second tab",
      description: "This is the second tab",
      markdownContent: `Just a link: https://reactjs.com.`,
      tagType: TabType.MARKDOWN,
    },
  ];

  const tabInfo3: MarkdownTabInfoType = {
    tabInfoId: "3",
    name: "Third tab",
    description: "This is the third tab",
    markdownContent: `A paragraph with *emphasis* and **strong importance**.
  
          > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
          
          * Lists
          * [ ] todo
          * [x] done
          
          A table:
          
          | a | b |
          | - | - |
          `,
    tagType: TabType.MARKDOWN,
  };

  const tabInfo4: GoogleCalendarTabInfoType = {
    tabInfoId: "4",
    name: "Family Calendar",
    description: "It's the fourth one",
    calendarUrl: "schedule",
    tagType: TabType.GOOGLE_CALENDAR,
  };

  const tabInfo5: GoogleDocTabInfoType = {
    tabInfoId: "5",
    name: "Weekday routine",
    description: "It's the routine for weekdays.",
    documentUrl: "weekday-routine",
    tagType: TabType.GOOGLE_DOC,
  };

  const tabInfo6: GoogleDocTabInfoType = {
    tabInfoId: "6",
    name: "Something else",
    description: "It's a Google Doc.",
    documentUrl: "google doc",
    tagType: TabType.GOOGLE_DOC,
  };

  tabs.push(tabInfo3, tabInfo4, tabInfo5, tabInfo6);

  async function getAllTabs() {
    return tabs;
  }

  async function getTab(tabId: string) {
    return tabs.find((t) => t.tabInfoId === tabId);
  }

  async function deleteTab(tabId: string) {
    const tab = getTab(tabId);
    if (!tab) {
      return new ItemNotFoundError(null);
    }
    //TODO: Move this out of this code into the handler.

    const tabUsedViews = (await testViewRepository.getAll())
      .filter((view) => view.tabIds.includes(tabId))
      .map((view) => view.viewInfoId);
    if (tabUsedViews && tabUsedViews.length > 0) {
      let message = `Error tab is used in views ${tabUsedViews}.`;
      return new InUseError(message);
    }
    tabs = tabs.filter((t) => t.tabInfoId != tabId);
  }

  async function updateTab(tab: TabInfoType) {
    console.log(`Tab: ${JSON.stringify(tab)}`);
    console.log(`Existing Tabs: ${JSON.stringify(tabs)}`);
    const existingTab = getTab(tab.tabInfoId);
    if (!existingTab) {
      tab.tabInfoId = randomUUID();
    } else {
      deleteTab(tab.tabInfoId);
    }
    console.log(`Removed?: ${JSON.stringify(tabs)}`);
    tabs.push(tab);
    console.log(`Updated Tabs: ${JSON.stringify(tabs)}`);
  }

  return {
    getAll: getAllTabs,
    get: getTab,
    delete: deleteTab,
    update: updateTab,
  };
})();

export const testViewRepository: ViewRepository = (function () {
  //TODO: Put this into a database.
  let views: ViewTabIdInfoType[] = [
    {
      viewInfoId: "1",
      displayName: "View 1",
      description: "Something descriptive",
      tabIds: ["1", "3"],
    },
    {
      viewInfoId: "2",
      displayName: "View 2",
      description: "Something else",
      tabIds: ["1", "2", "4", "5"],
    },
  ];

  async function getAllViews() {
    return views;
  }

  async function getView(viewId: string) {
    return views.find((view: ViewTabIdInfoType) => view.viewInfoId === viewId);
  }

  async function deleteView(viewId: string) {
    views = views.filter((v) => v.viewInfoId != viewId);
  }

  return {
    getAll: getAllViews,
    get: getView,
    delete: deleteView,
    update: async (value:ViewTabIdInfoType) => {}
  };
})();

export function toTestDependencies(): DataAccessDependencies {
  return {
    tabRepository: testTabRepository,
    viewRepository: testViewRepository,
  };
}
