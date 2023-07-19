import { TabRepository } from "./tab-data-access";
import { ViewRepository } from "./view-data-access";

export type DataAccessDependencies = {
  tabRepository: TabRepository;
  viewRepository: ViewRepository;
};
