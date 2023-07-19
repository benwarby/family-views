import {
  APIEndpoint,
  FamilyViewsEndpoint,
  FamilyViewsError,
  FamilyViewsRequest,
  FamilyViewsResponse,
  InvalidRequestError,
  OperationEnum,
  ServerError,
} from "@family-views/common";
import { Response, Express, RequestHandler } from "express";
import * as either from "fp-ts/Either";
import { getViewDataAccessHandlers } from "./view-data-access";
import { getTabAccessHandlers } from "./tab-data-access";
import { DataAccessDependencies } from "./dependencies";

export type DataRepository<T> = {
  getAll: () => Promise<T[]>;
  get: (id: string) => Promise<T | undefined>;
  delete: (id: string) => Promise<void | FamilyViewsError>;
  update: (value: T) => Promise<void>;
};

export type DataAccessEndpointHandler<Req, Res> = {
  endpoint: FamilyViewsEndpoint;
  handle: (req: FamilyViewsRequest<Req>) => FamilyViewsResponse<Res>;
};

export type APIRequestHandler<Req, Res> = (
  dependencies: DataAccessDependencies,
  req: FamilyViewsRequest<Req>
) => Promise<FamilyViewsResponse<Res>>;

export class DataAccessHandler<Req, Res> {
  readonly endpoint: APIEndpoint<Req, Res>;
  readonly handleRequest: APIRequestHandler<Req, Res>;

  constructor(
    cEndpoint: APIEndpoint<Req, Res>,
    cHandleRequest: APIRequestHandler<Req, Res>
  ) {
    this.endpoint = cEndpoint;
    this.handleRequest = cHandleRequest;
  }

  async handle(
    dependencies: DataAccessDependencies,
    req: FamilyViewsRequest<Req>
  ) {
    try {
      return this.handleRequest(dependencies, req);
    } catch (e) {
      return { body: either.left(new ServerError(null)) };
    }
  }
}

function sendInvalidRequestError(res: Response) {
  res.status(200).send(either.left({ body: new InvalidRequestError(null) }));
}

function initializeAllHandlers(dependencies: DataAccessDependencies) {
  let handlers: Map<string, Map<OperationEnum, RequestHandler>> = new Map();

  function initializeHandlers(
    dataAccessHandlers: DataAccessHandler<any, any>[],
    handlerMap: Map<string, Map<OperationEnum, RequestHandler>>
  ) {
    dataAccessHandlers.forEach((handler) => {
      const endpoint = handler.endpoint.endpoint;
      const path = endpoint.path;
      const operation = endpoint.endpointOperation;
      let operationsMap: Map<OperationEnum, RequestHandler> | undefined =
        handlerMap.get(path);
      if (!operationsMap) {
        operationsMap = new Map();
      }

      if (operationsMap.has(operation)) {
        throw new Error(`Operation ${operation} is already set for ${path}`);
      }
      let handleRequest: RequestHandler = (req, res) => {
        let request: FamilyViewsRequest<any> | null = null;
        try {
          request = req.body;
        } catch (e) {
          sendInvalidRequestError(res);
          return;
        }

        if (!request) {
          sendInvalidRequestError(res);
          return;
        }
        handler.handle(dependencies, request).then((response) => {
          console.log(`Response: ${JSON.stringify(response)}`);

          res.status(200).send(response);
        });
      };
      operationsMap.set(operation, handleRequest);
      handlerMap.set(path, operationsMap);
    });
  }

  initializeHandlers(getViewDataAccessHandlers(), handlers);
  initializeHandlers(getTabAccessHandlers(), handlers);

  return handlers;
}

export default function setupDataAccessEndpoints(
  dependencies: DataAccessDependencies,
  app: Express
) {
  const handlers: Map<
    string,
    Map<OperationEnum, RequestHandler>
  > = initializeAllHandlers(dependencies);
  handlers.forEach((value: Map<OperationEnum, RequestHandler>, key: string) => {
    app.post(key, (req, res, next) => {
      let request: FamilyViewsRequest<any> | null = null;
      try {
        request = req.body;
      } catch (e) {
        sendInvalidRequestError(res);
        return;
      }
      console.log(JSON.stringify(request));

      if (!request) {
        sendInvalidRequestError(res);
        return;
      }

      const operation = request.requestOperation;
      const reqHandler = value.get(operation);
      if (!reqHandler) {
        console.log("No request handler");
        sendInvalidRequestError(res);
        return;
      }
      reqHandler(req, res, next);
    });
  });
}
