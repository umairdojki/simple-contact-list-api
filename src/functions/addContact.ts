import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {

  let body;
  try {
    body = JSON.parse(event.body || '');
  } catch {
    return { statusCode: 400, body: 'Invalid payload' };
  }

  const ddbClient = new DocumentClient();
  const item = { 'id': uuidv4(), 'name': body.name, 'telephoneNumber': body.telephoneNumber,  };
  const params: DocumentClient.PutItemInput = {
    TableName: 'contact-list',
    Item: item
  };
  try {
    await ddbClient.put(params).promise();
  } catch (e) {
    if (e.name == 'ValidationException') {
      return { statusCode: 400, body: JSON.stringify(e) };
    } else {
      return { statusCode: 500, body: JSON.stringify(e) };
    }
  }

  return {
    statusCode: 201,
    headers: {
      'Location': `${event.headers.host}:/dev/contact`
    },
    body: JSON.stringify(item),
  };
};