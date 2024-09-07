import {
  DynamoDBClient,
  PutItemCommand,
  PutItemInput,
  QueryCommand,
  QueryCommandInput,
  ScanCommand
} from "@aws-sdk/client-dynamodb";
import {marshall, unmarshall} from "@aws-sdk/util-dynamodb";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";

export class DynamoDBService {
  private readonly dbClient: DynamoDBClient;

  constructor() {
    if(process.env.NODE_ENV === 'dev') {
      this.dbClient = new DynamoDBClient({
        region: 'localhost',
        endpoint: 'http://0.0.0.0:8000',
        credentials: {
          accessKeyId: 'MockAccessKeyId',
          secretAccessKey: 'MockSecretAccessKey'
        },
      });
    } else if(process.env.NODE_ENV === 'prod') {
      this.dbClient = new DynamoDBClient();
    }
    console.log(process.env.NODE_ENV)
  }

  async getAll(table: string) {
    const command = new ScanCommand({
      TableName: table
    });
    try {
      const query = await this.dbClient.send(command);
      if (!query.Items) return [];
      return query.Items.map(item => {
        return unmarshall(item);
      });
    } catch (error) {
      console.error(error);
      return null
    }
  }

  async getById(table: string, id: string) {
    const queryCommand: QueryCommandInput = {
      TableName: table,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': {S: id}
      }
    };
    try {
      const command = new QueryCommand(queryCommand);
      const query = await this.dbClient.send(command);
      if (!query.Items) return null;
      return query.Items.map(item => {
        return unmarshall(item);
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async save(table: string, item: any) {
    console.log(process.env.ENV)
    console.log(process.env.NODE_ENV)
    const params: PutItemInput = {
      TableName: table,
      Item: marshall(item, {
        removeUndefinedValues: true,
        convertEmptyValues: true
      })
    };
    try {
      return this.dbClient.send(new PutItemCommand(params));
    } catch (error) {
      console.error(error);
      return false;
    }
  }


}