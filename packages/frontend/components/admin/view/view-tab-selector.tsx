import * as either from "fp-ts/Either";

import {
  GetTabsResponseType,
  TabInfoType,
  ViewTabInfoType,
} from "@family-views/common";
import { ChangeEventHandler, useEffect, useState } from "react";

export default function ViewTabSelector({
  view,
  viewUpdated,
}: {
  view: ViewTabInfoType | null;
  viewUpdated: () => void;
}) {
  const [tabListItems, setTabListItems] = useState<JSX.Element[]>([]);
  const [allTabs, setAllTabs] = useState<TabInfoType[] | null>(null);

  const fetchAllTabs = async () => {
    const url: string = `/api/tabs`;
    return fetch(url, {
      method: "GET",
    })
      .then((result) => {
        return result.json();
      })
      .then((result: GetTabsResponseType) => {
        if (either.isRight(result)) {
          setAllTabs(result.right);
        }
      });
  };
  // fetchAllTabs();

  const checkboxChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const checked = e.currentTarget.checked;
    const url: string = `/api/view/update-tab?viewId=${view?.ViewInfoId}&tabId=${value}&checked=${checked}`;
    //TODO: This is a GET request, convention says we should use post or put
    //so we should fix it at some point.
    fetch(url).then(result => result.text()).then(text => {
        console.log(text)
        viewUpdated();
    })
    
  }

  useEffect(() => {
    if (!allTabs) {
      fetchAllTabs();
    }
    if (view && allTabs) {
      setTabListItems(
        allTabs.map((t) => {
          const selected: boolean = view.tabs.find(
            (vt) => t.tabInfoId === vt.tabInfoId
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
              ></input><label>{t.name}</label>
              
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
