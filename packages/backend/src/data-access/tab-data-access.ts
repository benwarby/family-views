import {
  TabInfoType,
  InvalidRequestError,
  ServerError,
  UnknownError,
  ItemNotFoundError,
  GetAllTabsAPIEndpoint,
  GetTabAPIEndpoint,
  DeleteTabAPIEndpoint,
  SaveTabAPIEndpoint,
} from "@family-views/common";
import { DataAccessHandler, DataRepository } from "./data-access";
import * as either from "fp-ts/Either";

import { randomUUID } from "crypto";
export type TabRepository = DataRepository<TabInfoType>;

function getAllTabsHandler() {
  return new DataAccessHandler(
    GetAllTabsAPIEndpoint,
    async (dependencies, req) => {
      return { body: either.right(await dependencies.tabRepository.getAll()) };
    }
  );
}

function getTabHandler() {
  return new DataAccessHandler(GetTabAPIEndpoint, async (dependencies, req) => {
    try {
      if (!req.body.tabId) {
        return { body: either.left(new InvalidRequestError(null)) };
      }
      const tab = await dependencies.tabRepository.get(req.body.tabId);
      console.log(`Tab: ${JSON.stringify(tab)}`);
      if (tab) {
        return {
          body: either.right(tab),
        };
      }
      return { body: either.left(new ItemNotFoundError(null)) };
    } catch (e) {
      console.log(e);
      return { body: either.left(new ServerError(null)) };
    }
  });
}

function getDeleteTabHandler() {
  return new DataAccessHandler(
    DeleteTabAPIEndpoint,
    async (dependencies, req) => {
      try {
        if (!req.body.tabId) {
          return { body: either.left(new InvalidRequestError(null)) };
        }
        await dependencies.tabRepository.delete(req.body.tabId);
        return { body: either.right({}) };
      } catch (e) {
        return { body: either.left(new ServerError(null)) };
      }
      return { body: either.left(new UnknownError(null)) };
    }
  );
}

function getSaveTabHandler() {
  return new DataAccessHandler(
    SaveTabAPIEndpoint,
    async (dependencies, req) => {
      try {
        if (!req.body.tab) {
          return { body: either.left(new InvalidRequestError(null)) };
        }
        const tab = req.body.tab;
        if (!tab.tabInfoId) {
          tab.tabInfoId = randomUUID()
        }
        await dependencies.tabRepository.update(req.body.tab);

        return { body: either.right({}) };
      } catch (e) {
        return { body: either.left(new ServerError(null)) };
      }
      return { body: either.left(new UnknownError(null)) };
    }
  );
}

export function getTabAccessHandlers() {
  let handlers: DataAccessHandler<any, any>[] = [];

  handlers.push(getAllTabsHandler());
  handlers.push(getTabHandler());
  handlers.push(getDeleteTabHandler());
  handlers.push(getSaveTabHandler());
  return handlers;
}
