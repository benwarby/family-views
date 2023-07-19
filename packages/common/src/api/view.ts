import { ViewInfoType } from "../dto/view-info";
import { ViewTabIdInfoType } from "../dto/view-tab-info";
import { APIEndpoint, Empty, FamilyViewsEndpoint, OperationEnum } from "./endpoint";


export const GetAllViewsEndpoint:FamilyViewsEndpoint = {
    endpointOperation: OperationEnum.READ,
    path: '/views'
}
export type GetAllViewsRequest = Empty
export type GetAllViewsResponse = ViewInfoType[]
export const GetAllViewsAPIEndpoint = new APIEndpoint<GetAllViewsRequest, GetAllViewsResponse>(GetAllViewsEndpoint)

export const GetViewEndpoint:FamilyViewsEndpoint = {
    endpointOperation: OperationEnum.READ,
    path: '/view'
}
export type GetViewRequest = {viewId:string}
export type GetViewResponse = ViewTabIdInfoType
export const GetViewAPIEndpoint = new APIEndpoint<GetViewRequest, GetViewResponse>(GetViewEndpoint)

export const GetViewTabEndpoint:FamilyViewsEndpoint = {
    endpointOperation: OperationEnum.READ,
    path: '/view-tab'
}
// export type GetViewTabRequest = {viewId:string}
// export type GetViewTabResponse = ViewTabIdInfoType
// export const GetViewTabAPIEndpoint = new APIEndpoint<GetViewTabRequest, GetViewTabResponse>(GetViewTabEndpoint)

export const DeleteViewEndpoint:FamilyViewsEndpoint = {
    endpointOperation: OperationEnum.DELETE,
    path: '/view'
}
export type DeleteViewRequest = {viewId:string}
export type DeleteViewResponse = Empty
export const DeleteViewAPIEndpoint = new APIEndpoint<DeleteViewRequest, DeleteViewResponse>(DeleteViewEndpoint)

export const UpdateTabInViewEndpoint:FamilyViewsEndpoint = {
    endpointOperation: OperationEnum.UPDATE,
    path: '/updateTabInView'
}
export type UpdateTabInViewRequest = {
    viewId:string,
    tabId:string,
    operation:'ADD'|'REMOVE'
}
export type UpdateTabInViewResponse = Empty
export const UpdateTabInViewAPIEndpoint = new APIEndpoint<UpdateTabInViewRequest, UpdateTabInViewResponse>(UpdateTabInViewEndpoint)


export const SaveViewEndpoint:FamilyViewsEndpoint = {
    endpointOperation: OperationEnum.CREATE,
    path: '/view'
}
export type SaveViewEndpointRequest = {
    view: ViewTabIdInfoType
}
export type SaveViewEndpointResponse = Empty
export const SaveViewAPIEndpoint = new APIEndpoint<SaveViewEndpointRequest, SaveViewEndpointResponse>(SaveViewEndpoint)