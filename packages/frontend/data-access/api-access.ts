import {
  APIEndpoint,
  FamilyViewsRequest,
  FamilyViewsResponse,
} from "@family-views/common";
import { DataAccessDependencies } from "./dependencies";

export async function callApiEndpoint<Req, Res>(
  apiEndpoint: APIEndpoint<Req, Res>,
  body: Req
) {
  const endpoint = apiEndpoint.endpoint;

  const dep: DataAccessDependencies = await fetch(`/api/deps`, {
    method: "GET",
  }).then((result) => result.json());

  console.log(dep);
  const url = `${dep.backendUrl}${endpoint.path}`;
  console.log(url);
  const requestBody: FamilyViewsRequest<Req> = {
    body: body,
    requestOperation: endpoint.endpointOperation,
  };

  let init: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify(requestBody),
  };

  const result: FamilyViewsResponse<Res> = await fetch(url, init).then(
    (result) => result.json()
  );

  return result;
}
