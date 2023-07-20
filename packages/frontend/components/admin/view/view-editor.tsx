import {
  GetAllTabsAPIEndpoint,
  SaveViewAPIEndpoint,
  TabInfoType,
  ViewTabIdInfoType,
} from "@family-views/common";
import * as either from "fp-ts/Either";
import { FormEventHandler, useEffect, useReducer, useState } from "react";
import { callApiEndpoint } from "../../../data-access/api-access";
import EditorHelper, { ActionType } from "../editor-helper";

export default function ViewEditor({
  viewToEdit,
}: {
  viewToEdit: ViewTabIdInfoType;
}) {
  const editorHelper = EditorHelper<ViewTabIdInfoType>();
  const [allTabs, setAllTabs] = useState<TabInfoType[] | null>(null);
  const [tabListItems, setTabListItems] = useState<JSX.Element[]>([]);
  const [view, viewDispatch] = useReducer(editorHelper.reducer, viewToEdit);

  const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(`Save data: ${JSON.stringify(view)}`);
    callApiEndpoint(SaveViewAPIEndpoint, {
      view: view,
    }).then((response) => {
      const body = response.body;
      if (either.isLeft(body)) {
        console.log(`Error ${body.left}`);
      }
    });
  };

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

  useEffect(() => {
    fetchAllTabs();
  }, [view]);

  const swapStringArray = (
    myArray: string[],
    index1: number,
    index2: number
  ) => {
    [myArray[index1], myArray[index2]] = [myArray[index2], myArray[index1]];
  };
  const getClonedTabIdsArray = () => {
    let tabIds: string[] = [];
    view.tabIds.forEach((tabId) => {
      tabIds.push(tabId);
    });
    return tabIds;
  };
  const getSelectedButtons = (tab: TabInfoType, index: number) => {
    let removeButton = (
      <>
        <span
          onClick={(e) => {
            let tabIds: string[] = [];
            view.tabIds.forEach((tabId) => {
              if (tabId != tab.tabInfoId) {
                tabIds.push(tabId);
              }
            });

            viewDispatch({
              action: ActionType.UPDATE,
              fieldName: "tabIds",
              value: tabIds,
            });
          }}
        >
          Remove
        </span>
      </>
    );
    let upButton = <></>;
    let downButton = <></>;

    if (index !== 0) {
      upButton = (
        <>
          <span
            onClick={(e) => {
              let tabIds = getClonedTabIdsArray();
              swapStringArray(tabIds, index, index - 1);
              viewDispatch({
                action: ActionType.UPDATE,
                fieldName: "tabIds",
                value: tabIds,
              });
            }}
          >
            Up
          </span>
        </>
      );
    }
    if (index < view.tabIds.length - 1) {
      downButton = (
        <>
          <span
            onClick={(e) => {
              let tabIds = getClonedTabIdsArray();
              swapStringArray(tabIds, index, index + 1);
              viewDispatch({
                action: ActionType.UPDATE,
                fieldName: "tabIds",
                value: tabIds,
              });
            }}
          >
            Down
          </span>
        </>
      );
    }
    return (
      <>
        {removeButton}
        {upButton}
        {downButton}
      </>
    );
  };
  useEffect(() => {
    if (allTabs) {
      let selectedItems: JSX.Element[] = [];
      let unselectedItems: JSX.Element[] = [];
      let tabs: TabInfoType[] = [];
      allTabs.forEach((t) => {
        tabs.push(t);
      });
      view.tabIds.forEach((tId, i) => {
        const tab = tabs.find((tab) => tab.tabInfoId === tId);
        if (!tab) {
          console.log("Error.  Couldnt find tab");
        } else {
          const id: string = `tabId_${tab.tabInfoId}`;
          console.log(id);
          selectedItems.push(
            <li key={id} id={id}>
              {tab.name} -{getSelectedButtons(tab, i)}
            </li>
          );
          tabs = tabs.filter((t) => t.tabInfoId != tId);
        }
      });
      tabs.forEach((tab) => {
        const id: string = `tabId_${tab.tabInfoId}`;
        console.log(id);
        unselectedItems.push(
          <li key={id} id={id}>
            {tab.name} -{" "}
            <span
              onClick={(e) => {
                let tabIds: string[] = [];
                view.tabIds.forEach((tabId) => {
                  tabIds.push(tabId);
                });
                tabIds.push(tab.tabInfoId);

                viewDispatch({
                  action: ActionType.UPDATE,
                  fieldName: "tabIds",
                  value: tabIds,
                });
              }}
            >
              Add
            </span>
          </li>
        );
      });
      setTabListItems([
        <>Selected</>,
        <>
          <ul>{selectedItems}</ul>
        </>,
        <>Unselected</>,
        <>
          <ul>{unselectedItems}</ul>
        </>,
      ]);
    }
  }, [allTabs]);

  return (
    <>
      <form method="post" onSubmit={submitForm}>
        <label>
          Name:{" "}
          <input
            type="text"
            id="viewDisplayName"
            name="viewDisplayName"
            defaultValue={view?.displayName ?? ""}
            onChange={(e) => {
              if (!view) {
                console.log("no view");
                return;
              }
              viewDispatch({
                action: ActionType.UPDATE,
                fieldName: "displayName",
                value: e.target.value,
              });

              console.log(`View name changed ${JSON.stringify(view)}`);
            }}
          ></input>
        </label>
        <br />
        <label>Description: </label>
        <input
          type="text"
          id="viewDescription"
          name="viewDescription"
          defaultValue={view?.description ?? ""}
          onChange={(e) => {
            if (!view) {
              console.log("no tab");
              return;
            }
            viewDispatch({
              action: ActionType.UPDATE,
              fieldName: "description",
              value: e.target.value,
            });
            console.log(`view description changed ${JSON.stringify(view)}`);
          }}
        ></input>
        <br />
        <label>Tab Transition in seconds (0 = no automatic Transition): </label>
        <input
          type="number"
          min="0"
          max="360"
          id="tabTransitionInSeconds"
          name="tabTransitionInSeconds"
          defaultValue={view?.tabTransitionInSeconds}
          onChange={(e) => {
            if (!view) {
              console.log("no view");
              return;
            }
            viewDispatch({
              action: ActionType.UPDATE,
              fieldName: "tabTransitionInSeconds",
              value: e.target.value,
            });
          }}
        ></input>
        <br />
        {tabListItems}
        <br />
        <button id="saveButton" type="submit">
          Save
        </button>
      </form>
    </>
  );
}
