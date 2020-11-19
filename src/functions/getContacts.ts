import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const handler: APIGatewayProxyHandler = async() => {

  const ddbClient = new DocumentClient();
  let contacts;
  try {
    contacts = (await ddbClient.scan({TableName: 'contact-list'}).promise()).Items;
  }
  catch (e) {
    return { statusCode: 500, body: e };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(contacts)
  };

};