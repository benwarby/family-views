import {
  DynamoDBClient,
  CreateTableCommand,
  CreateTableCommandInput,
  DynamoDBClientConfig,
  ScanCommand,
  ScanCommandInput,
  PutItemCommandInput,
  PutItemCommand,
  DeleteItemCommandInput,
  DeleteItemCommand,
  GetItemCommandInput,
  GetItemCommand,
  DeleteTableCommandInput,
  DeleteTableCommand,
} from "@aws-sdk/client-dynamodb";
import { DataRepository } from "../../data-access/data-access";

import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export abstract class AWSTable<T> implements DataRepository<T> {
  protected tableName: string;
  protected configuration: DynamoDBClientConfig;
  protected key = "id";
  protected dynamoDB: DynamoDBClient;

  protected constructor(
    tableName: string,
    configuration: DynamoDBClientConfig
  ) {
    this.tableName = `FamilyViews-${tableName}`;
    this.configuration = configuration;
    this.dynamoDB = new DynamoDBClient(configuration);
  }

  protected getCreateTableInput() {
    const table: CreateTableCommandInput = {
      TableName: this.tableName,
      KeySchema: [
        { AttributeName: this.key, KeyType: "HASH" }, //Partition key
      ],
      AttributeDefinitions: [{ AttributeName: this.key, AttributeType: "S" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };
    return table;
  }

  deleteTable = async () => {
    const deleteTableInput: DeleteTableCommandInput = {
      TableName: this.tableName,
    };
    console.log(`Deleting table ${JSON.stringify(deleteTableInput)}`);
    const deleteTableResult = await this.dynamoDB.send(
      new DeleteTableCommand(deleteTableInput)
    );
    console.log(`Delete table result: ${deleteTableResult}`);
  };

  createTable = async () => {
    const createTableInput = this.getCreateTableInput();
    console.log(`Creating table ${JSON.stringify(createTableInput)}`);
    const createTableResult = await this.dynamoDB.send(
      new CreateTableCommand(this.getCreateTableInput())
    );

    console.log(JSON.stringify(createTableResult));
  };

  abstract getId(value: T): string;

  initializeTable = async (values: T[]) => {
    for (const value of values) {
      await this.update(value);
    }
  };

  getAll = async () => {
    const params: ScanCommandInput = {
      TableName: this.tableName,
    };
    console.log(params);
    const result = await this.dynamoDB.send(new ScanCommand(params));

    const values: T[] = [];

    result.Items?.forEach((item) => {
      const value = unmarshall(item);
      const data = value.data as T;
      values.push(data);
    });

    return values;
  };

  get = async (id: string) => {
    const params: GetItemCommandInput = {
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    };
    console.log(`Getting item: ${JSON.stringify(params)}`);
    const result = await this.dynamoDB.send(new GetItemCommand(params));
    console.log(`Found item result ${JSON.stringify(result)}`);
    if (result.Item && result.Item.data) {
      const item = unmarshall(result.Item);
      console.log(`Item: ${JSON.stringify(item)}`);
      const data = item.data as T;
      console.log(`Item Data (${typeof data}): ${JSON.stringify(data)}`);
      return data;
    }
    return undefined;
  };

  delete = async (id: string) => {
    const deleteItemInput: DeleteItemCommandInput = {
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    };

    console.log(`Deleting item: ${JSON.stringify(deleteItemInput)}`);
    const result = this.dynamoDB.send(new DeleteItemCommand(deleteItemInput));
    console.log(`Delete result: ${JSON.stringify(result)}`);
  };

  update = async (value: T) => {
    const params: PutItemCommandInput = {
      TableName: this.tableName,
      Item: marshall({
        id: this.getId(value),
        data: value,
      }),
    };
    console.log(`Putting item: ${JSON.stringify(params)}`);
    const putItemResult = await this.dynamoDB.send(new PutItemCommand(params));

    console.log(`Putting item response: ${JSON.stringify(putItemResult)}`);
  };
}
