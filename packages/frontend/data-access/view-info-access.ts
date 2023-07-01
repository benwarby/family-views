import { GetViewResponseType, ViewInfoType } from "@family-views/common";
import { DataAccessDependencies } from "./dependencies";

export async function getViewInfoList(deps: DataAccessDependencies) {
  const url = deps.backendUrl + "/view";
  const res = await fetch(url, {
    mode: "no-cors",
    cache: "no-store",
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Unable to get views");
  }
  const json: ViewInfoType[] = (await res.json()).result;

  return json;
}

export async function getViewInfo(
  deps: DataAccessDependencies,
  viewId: string
) {
  const url = `${deps.backendUrl}/view/${viewId}`;
  const res = await fetch(url, {
    mode: "no-cors",
    cache: "no-store",
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Unable to get views");
  }
  const json: GetViewResponseType = await res.json();

  return json;
}

export async function updateViewTab(
  deps: DataAccessDependencies,
  viewId: string,
  tabId: string,
  checked: string
) {
  const url = `${deps.backendUrl}/view/update-tab?viewId=${viewId}&tabId=${tabId}&checked=${checked}`;
  console.log(url);
  try {
    const res = await fetch(url, {
      cache: "no-store",
      method: "PUT",
    });
    // console.log(res);
    if (!res.ok) {
      throw new Error("Unable to update view tab");
    }
    const text: string = await res.text();
    console.log(text);
    return text;
  } catch (e) {
    console.log(e)
  }
}
