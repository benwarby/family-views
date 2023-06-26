import { GetViewResponseType, ViewInfoType } from "@family-views/common";
import { DataAccessDependencies } from "./dependencies";


export async function getViewInfoList(deps: DataAccessDependencies) {
    const url = deps.backendUrl + "/view"
    const res = await fetch(url, {
        mode: 'no-cors',
        cache: 'no-store',
        method: 'GET'
    });
    if (!res.ok) {
        throw new Error('Unable to get views')
    }
    const json:ViewInfoType[] = (await res.json()).result;

    return json;
}

export async function getViewInfo(deps: DataAccessDependencies, viewId:string) {
    const url = `${deps.backendUrl}/view/${viewId}`
    const res = await fetch(url, {
        mode: 'no-cors',
        cache: 'no-store',
        method: 'GET'
    });
    if (!res.ok) {
        throw new Error('Unable to get views')
    }
    const json:GetViewResponseType = (await res.json());

    return json;
}