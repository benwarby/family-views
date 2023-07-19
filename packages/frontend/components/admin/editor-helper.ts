import { Dispatch, Reducer } from "react";

export enum ActionType {
  NEW = "NEW",
  UPDATE = "UPDATE",
}
export type UpdateEventAction<V> = {
  action: ActionType.UPDATE;
  fieldName: string;
  value: V;
};
export type NewEventAction<T> = {
  action: ActionType.NEW;
  tab: T;
};
export type TabEventAction = UpdateEventAction<any> | NewEventAction<any>;

export type TabDispatch = Dispatch<TabEventAction>;

export default function EditorHelper<T>() {
  const reducer: Reducer<T, TabEventAction> = (
    prevState: T,
    event: TabEventAction
  ) => {
    console.log(JSON.stringify(event));
    if (event.action === ActionType.NEW) {
      console.log(`New: ${JSON.stringify(event.tab)}`);
      return event.tab;
    }
    if (prevState && event.action === ActionType.UPDATE) {
      const newValue = { ...prevState, [event.fieldName]: event.value };
      console.log(`New Value: ${JSON.stringify(newValue)}`);
      console.log(newValue);
      return newValue;
    }
    console.log(`Keeping prev state: ${JSON.stringify(prevState)}`);
    return prevState;
  };

  return { reducer };
}
