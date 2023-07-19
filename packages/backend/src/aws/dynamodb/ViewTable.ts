import { ViewTabIdInfoType } from "@family-views/common";
import { AWSTable } from "./AWSTable";
import { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

export default class ViewTable extends AWSTable<ViewTabIdInfoType> {
  public constructor(configuration: DynamoDBClientConfig) {
    super("View", configuration);
  }
  getId(value: ViewTabIdInfoType): string {
    return value.viewInfoId;
  }
}
