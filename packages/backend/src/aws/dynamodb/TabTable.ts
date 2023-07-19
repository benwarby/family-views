import { TabInfoType } from "@family-views/common";
import { AWSTable } from "./AWSTable";
import { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

export default class TabTable extends AWSTable<TabInfoType> {
  public constructor(configuration: DynamoDBClientConfig) {
    super("Tab", configuration);
  }
  getId(value: TabInfoType): string {
    return value.tabInfoId;
  }
}
