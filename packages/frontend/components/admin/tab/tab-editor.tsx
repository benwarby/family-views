import {
  GoogleCalendarTabInfoType,
  GoogleDocTabInfoType,
  MarkdownTabInfoType,
  SaveTabAPIEndpoint,
  TabInfoType,
  TabType,
} from "@family-views/common";
import { Dispatch, FormEventHandler, Reducer, useReducer } from "react";
import EditMarkdownTab from "./edit-markdown-tab";
import EditGoogleCalendarTab from "./edit-google-calendar-tab";
import EditGoogleDocTab from "./edit-google-doc-tab";
import styles from "./tab-editor.module.css";
import { callApiEndpoint } from "../../../data-access/api-access";

import * as either from "fp-ts/Either";

export enum ActionType {
  NEW = "NEW",
  UPDATE = "UPDATE",
}
export type UpdateTabEventAction<T> = {
  action: ActionType.UPDATE;
  fieldName: string;
  value: T;
};
export type NewTabEventAction = {
  action: ActionType.NEW;
  tab: TabInfoType;
};
export type TabEventAction = UpdateTabEventAction<any> | NewTabEventAction;

export type TabDispatch = Dispatch<TabEventAction>;
export type NewTabType = TabInfoType | null;


export default function TabEditor({
  tabToEdit
}: {
  tabToEdit: TabInfoType;
}) {
  const reducer: Reducer<TabInfoType, TabEventAction> = (
    prevState: TabInfoType,
    event: TabEventAction
  ) => {
    console.log(JSON.stringify(event))
    if (event.action === ActionType.NEW) {
      console.log(`New: ${JSON.stringify(event.tab)}`)
      return event.tab;
    }
    if (prevState && event.action === ActionType.UPDATE) {
      const newValue = { ...prevState, [event.fieldName]: event.value };
      console.log(`New Value: ${JSON.stringify(newValue)}`)
      console.log(newValue)
      return newValue;
    }
    console.log(`Keeping prev state: ${JSON.stringify(prevState)}`)
    return prevState;
  };

  const [tab, tabDispatch] = useReducer(reducer, tabToEdit);

  const getForm = () => {
    console.log('GET_FORM')
    return (
      <form method="post" onSubmit={submitForm}>
        <label>
          Name:{" "}
          <input
            type="text"
            id="tabName"
            name="tabName"
            defaultValue={tab?.name ?? ""}
            onChange={(e) => {
              if (!tab) {
                console.log("no tab");
                return;
              }
              tabDispatch({
                action: ActionType.UPDATE,
                fieldName: "name",
                value: e.target.value,
              });
              console.log(`tab name changed ${JSON.stringify(tab)}`);
            }}
          ></input>
        </label>
        <br />
        <label>Description: </label>
        <input
          type="text"
          id="typeDescription"
          name="typeDescription"
          defaultValue={tab?.description ?? ""}
          onChange={(e) => {
            if (!tab) {
              console.log("no tab");
              return;
            }

            tabDispatch({
              action: ActionType.UPDATE,
              fieldName: "description",
              value: e.target.value,
            });
            console.log(`tab description changed ${JSON.stringify(tab)}`);
          }}
        ></input>
        <br />
        {getSubform()}
        <br />
        <button id="saveButton" type="submit">
          Save
        </button>
      </form>
    );
  };

  const getSubform = () => {
    console.log('GET_SUBFORM')
    if (!tab) {
      return <>You're doing it wrong.</>;
    }
    switch (tab.tagType) {
      case TabType.MARKDOWN:
        let markdownTab: MarkdownTabInfoType = tab;
        return (
          <EditMarkdownTab
            tab={markdownTab}
            tabDispatch={tabDispatch}
          ></EditMarkdownTab>
        );
      case TabType.GOOGLE_CALENDAR:
        const editGoogleCalendarTab: GoogleCalendarTabInfoType = tab;
        return (
          <EditGoogleCalendarTab
            tab={editGoogleCalendarTab}
            tabDispatch={tabDispatch}
          ></EditGoogleCalendarTab>
        );
      case TabType.GOOGLE_DOC:
        const editGoogleDocTab: GoogleDocTabInfoType = tab;
        return (
          <EditGoogleDocTab
            tab={editGoogleDocTab}
            tabDispatch={tabDispatch}
          ></EditGoogleDocTab>
        );
      default:
        return <>Please select a type of tab.</>;
    }
  };

  const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // const form = e.currentTarget;
    // const formData = new FormData(form);
    // console.log(formData);
    console.log(`Save data: ${JSON.stringify(tab)}`)
    callApiEndpoint(SaveTabAPIEndpoint, {tab:tab}).then((result) => {
      const body = result.body;
      if (either.isLeft(body)) {
        console.log(`Error saving from ${JSON.stringify(body.left)}`)
      }
    })
  };

  return (
    <>
      <h2>{tab.name}</h2>

      <div>Tab Type: {tab.tagType}</div>
      {getForm()}
    </>
  );
}
