import { TabInfoType } from "@family-views/common";
import { DataAccessDependencies } from "./dependencies";

export async function getTabInfoList(deps: DataAccessDependencies) {
    const url = deps.backendUrl + "/tab-info"
    const res = await fetch(url, {
        mode: 'no-cors',
        cache: 'no-store',
        method: 'GET'
    });
    if (!res.ok) {
        throw new Error('Unable to get tabs')
    }
    const json:TabInfoType[] = (await res.json()).result;

    return json;
}