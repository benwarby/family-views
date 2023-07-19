import { DataAccessDependencies } from "../data-access/dependencies";
import TabTable from "./dynamodb/TabTable";
import ViewTable from "./dynamodb/ViewTable";
import { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

export type AWSDependencies = {
  awsRegion: string;
  awsEndpoint: string;
};

export async function toAWSDependencies(): Promise<DataAccessDependencies> {
  const configuration: DynamoDBClientConfig = {
    region: "localhost",
    endpoint: "http://localhost:8005",
  };
  const tabTable = new TabTable(configuration);
  // await tabTable.createTable()
  // await tabTable.initializeTable(await testTabRepository.getAll());
  const viewTable = new ViewTable(configuration);
  // await viewTable.createTable()
  // await viewTable.initializeTable(await testViewRepository.getAll());

  return {
    tabRepository: tabTable,
    viewRepository: viewTable,
  };
}
