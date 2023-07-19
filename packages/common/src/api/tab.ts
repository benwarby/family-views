import { TabInfoType } from "../dto/tab-info";
import { APIEndpoint, Empty, FamilyViewsEndpoint, OperationEnum } from "./endpoint";

export const GetAllTabsEndpoint:FamilyViewsEndpoint = {
    endpointOperation: OperationEnum.READ,
    path: '/tabs'
}
export type GetAllTabsRequest = Empty
export type GetAllTabsResponse = TabInfoType[]
export const GetAllTabsAPIEndpoint = new APIEndpoint<GetAllTabsRequest, GetAllTabsResponse>(GetAllTabsEndpoint)

export const GetTabEndpoint:FamilyViewsEndpoint = {
    endpointOperation: OperationEnum.READ,
    path: '/tab'
}
export type GetTabRequest = {tabId:string}
export type GetTabResponse = TabInfoType
export const GetTabAPIEndpoint = new APIEndpoint<GetTabRequest, GetTabResponse>(GetTabEndpoint)

export const DeleteTabEndpoint:FamilyViewsEndpoint = {
    endpointOperation: OperationEnum.DELETE,
    path: '/tab'
}
export type DeleteTabRequest = {tabId:string}
export type DeleteTabResponse = Empty
export const DeleteTabAPIEndpoint = new APIEndpoint<DeleteTabRequest, DeleteTabResponse>(DeleteTabEndpoint)

//TODO: Update Tab
export const SaveTabEndpoint:FamilyViewsEndpoint = {
    endpointOperation: OperationEnum.CREATE,
    path: '/tab'
}
export type SaveTabEndpointRequest = {
    tab: TabInfoType
}
export type SaveTabEndpointResponse = Empty
export const SaveTabAPIEndpoint = new APIEndpoint<SaveTabEndpointRequest, SaveTabEndpointResponse>(SaveTabEndpoint)