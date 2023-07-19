import {
  ItemNotFoundError,
  InvalidRequestError,
  ServerError,
  UnknownError,
  ViewTabIdInfoType,
  DeleteViewAPIEndpoint,
  UpdateTabInViewAPIEndpoint,
  GetViewAPIEndpoint,
  GetAllViewsAPIEndpoint,
  SaveViewAPIEndpoint,
} from "@family-views/common";
import * as either from "fp-ts/Either";
import lodash = require("lodash");
import { DataAccessHandler, DataRepository } from "./data-access";
export type ViewRepository = DataRepository<ViewTabIdInfoType> 
import { randomUUID } from "crypto";

function getAllViewsHandler() {
  return new DataAccessHandler(
    GetAllViewsAPIEndpoint,
    async (dependencies, req) => {
      return { body: either.right(await dependencies.viewRepository.getAll()) };
    }
  );
}

function getViewHandler() {
  return new DataAccessHandler(
    GetViewAPIEndpoint,
    async (dependencies, req) => {
      try {
        if (!req.body.viewId) {
          return { body: either.left(new InvalidRequestError(null)) };
        }
        const view = await dependencies.viewRepository.get(req.body.viewId);
        if (view) {
          return {
            body: either.right(view),
          };
        }
        return { body: either.left(new ItemNotFoundError(null)) };
      } catch (e) {
        return { body: either.left(new ServerError(null)) };
      }
    }
  );
}

function getUpdateTabInViewHandler() {
  return new DataAccessHandler(
    UpdateTabInViewAPIEndpoint,
    async (dependencies, req) => {
      if (!req.body.viewId) {
        return {
          body: either.left(
            new InvalidRequestError("ViewId not found in request.")
          ),
        };
      }
      if (!req.body.tabId) {
        return {
          body: either.left(
            new InvalidRequestError("TabId not found in request")
          ),
        };
      }
      if (!req.body.operation) {
        return {
          body: either.left(
            new InvalidRequestError("Operation not found in request")
          ),
        };
      }
      try {
        const view = await dependencies.viewRepository.get(req.body.viewId);
        if (!view) {
          return { body: either.left(new ItemNotFoundError("View not found")) };
        }
        if (!dependencies.tabRepository.get(req.body.tabId)) {
          return { body: either.left(new ItemNotFoundError("Tab not found")) };
        }

        const i = view.tabIds.indexOf(req.body.tabId);
        console.log(i);

        switch (req.body.operation) {
          case "ADD":
            if (i < 0) {
              view.tabIds.push(req.body.tabId);
              await dependencies.viewRepository.update(view)
              return { body: either.right({}) };
            }
            break;
          case "REMOVE":
            if (i > -1) {
              view.tabIds = view.tabIds.filter((e) => e != req.body.tabId);
              await dependencies.viewRepository.update(view)
              return { body: either.right({}) };
            }
            break;
          default:
            break;
        }
        return { body: either.left(new UnknownError(null)) };
      } catch (e) {
        return { body: either.left(new ServerError(null)) };
      }
    }
  );
}

function getDeleteViewHandler() {
  return new DataAccessHandler(
    DeleteViewAPIEndpoint,
    async (dependencies, req) => {
      try {
        if (!req.body.viewId) {
          return { body: either.left(new InvalidRequestError(null)) };
        }
        if (!dependencies.viewRepository.get(req.body.viewId)) {
          return { body: either.left(new ItemNotFoundError(null)) };
        }
        dependencies.viewRepository.delete(req.body.viewId);
      } catch (e) {
        return { body: either.left(new ServerError(null)) };
      }
      return { body: either.left(new UnknownError(null)) };
    }
  );
}

function getSaveViewHandler() {
  return new DataAccessHandler(SaveViewAPIEndpoint, async (dependencies, req) => {
    if (!req.body.view) {
      return { body: either.left(new InvalidRequestError(null)) };
    }
    try {
      const view = req.body.view;
      if (!view.viewInfoId) {
        view.viewInfoId = randomUUID()
      }
      await dependencies.viewRepository.update(view)
      return {body: either.right({})}
    } catch (e) {
      console.log(e)
      return { body: either.left(new ServerError(null)) };
    }
    return { body: either.left(new UnknownError(null)) };
  })
}

export function getViewDataAccessHandlers() {
  let handlers: DataAccessHandler<any, any>[] = [];

  handlers.push(getAllViewsHandler());
  handlers.push(getViewHandler());
  handlers.push(getDeleteViewHandler());
  handlers.push(getUpdateTabInViewHandler());
  handlers.push(getSaveViewHandler())

  return handlers;
}
