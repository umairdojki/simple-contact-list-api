import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {

  const ddbClient = new DocumentClient();
  const params: DocumentClient.DeleteItemInput = {
    TableName: 'contact-list',
    Key: {
      'id': event.pathParameters?.id
    }
  };
  try {
    await ddbClient.delete(params).promise();
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify(e) };
  }

  return {
    statusCode: 200,
    body: `${event.pathParameters?.id} deleted`,
  };
};