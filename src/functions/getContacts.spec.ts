/* eslint-disable @typescript-eslint/no-empty-function */
import 'mocha';
import { expect } from 'chai';
import * as AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Context, APIGatewayProxyEvent } from 'aws-lambda';

import { handler } from './getContacts';

describe('Handler', () => {

  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('on success', async () => {

    // given
    const items = [
      { id: '1', name: 'Umair', telephoneNumber: '07896318163' },
      { id: '2', name: 'Umair 2', telephoneNumber: '07896318163' },
    ];
    const mockedResponseFromDb: DocumentClient.ScanOutput = { Items: items };
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params: DocumentClient.ScanInput, callback: Function) => {
      callback(null, mockedResponseFromDb);
    });

    // when
    const result = await handler({} as APIGatewayProxyEvent, {} as Context, () => {});

    // then
    expect(result).to.deep.include(
      {
        statusCode: 200,
        body: JSON.stringify(items)
      }
    );
  });

  it('on error', async () => {

    // given
    const error = 'some error';
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params: DocumentClient.ScanInput, callback: Function) => {
      callback(error);
    });

    // when
    const result = await handler({} as APIGatewayProxyEvent, {} as Context, () => {});

    // then
    expect(result).to.deep.include(
      {
        statusCode: 500,
        body: error
      }
    );
  });
});