import * as either from "fp-ts/Either";

import {
  GetAllTabsAPIEndpoint,
  TabInfoType,
  UpdateTabInViewAPIEndpoint,
  ViewTabIdInfoType,
} from "@family-views/common";
import { ChangeEventHandler, useEffect, useState } from "react";
import { callApiEndpoint } from "../../../data-access/api-access";

export default function ViewTabSelector({
  view,
  viewUpdated,
}: {
  view: ViewTabIdInfoType | null;
  viewUpdated: () => void;
}) {
  const [tabListItems, setTabListItems] = useState<JSX.Element[]>([]);
  const [allTabs, setAllTabs] = useState<TabInfoType[] | null>(null);

  const fetchAllTabs = async () => {
    callApiEndpoint(GetAllTabsAPIEndpoint, {}).then((result) => {
      const body = result.body;
      if (either.isRight(body)) {
        setAllTabs(body.right);
      } else {
        console.log(body.left);
      }
    });
  };

  const checkboxChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!view) {
      console.log("Error with checkboxes");
    }
    const value = e.target.value;
    const checked = e.currentTarget.checked;
    if (view) {
      callApiEndpoint(UpdateTabInViewAPIEndpoint, {
        viewId: view.viewInfoId,
        tabId: value,
        operation: checked ? "ADD" : "REMOVE",
      }).then((result) => {
        const body = result.body;
        if (either.isLeft(body)) {
          console.log(`Error updating tab in view: ${body.left}`);
        } else {
          viewUpdated();
        }
      });
    }
  };

  useEffect(() => {
    if (!allTabs) {
      fetchAllTabs();
    }
    if (view && allTabs) {
      setTabListItems(
        allTabs.map((t) => {
          const selected: boolean = view.tabIds.find(
            (tabId) => t.tabInfoId === tabId
          )
            ? true
            : false;
          return (
            <li>
              <input
                type="checkbox"
                name={t.name}
                value={t.tabInfoId}
                checked={selected}
                onChange={checkboxChange}
              ></input>
              <label>{t.name}</label>
            </li>
          );
        })
      );
    }
  }, [view, allTabs]);

  return (
    <>
      <form>
        <h3>Tabs</h3>
        <ul>{tabListItems}</ul>
      </form>
    </>
  );
}
