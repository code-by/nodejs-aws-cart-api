#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
// import { NestAppStack } from "../lib/nestAppStack";

// import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { HttpApi, HttpMethod }  from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";

class NestAppStack extends cdk.Stack {
  constructor() {
    super(new cdk.App(), 'NestAppStack');

    // lambdas
    const nestAppLambda = new lambdaNode.NodejsFunction(
      this,
      "nestAppLambdaNew",
      {
        functionName: "nestAppLambdaNew",
        entry: path.join(__dirname, "../dist/src/main.js"),
        //entry: path.join(__dirname, "../dist/main.js"),
        memorySize: 1024,
        timeout: cdk.Duration.seconds(10),
        runtime: lambda.Runtime.NODEJS_18_X,
        // handler: "lambdaHandler",
        environment: {},
        //projectRoot: "./tscnfig.json",
        bundling: {
          format: lambdaNode.OutputFormat.CJS,
          externalModules: [
            "@nestjs/websockets",
            "@nestjs/microservices/microservices-module",
            "@nestjs/microservices",
            "class-transformer",
            "class-validator",
          ],
        },
      },
    );

    // gateway
    const lambdatIntegration = new HttpLambdaIntegration('CartLambda', nestAppLambda);

    const cartHTTPApi = new HttpApi(this, 'CartHTTPApi', {
    });
    
    cartHTTPApi.addRoutes({
      path: '/{proxy+}',
      // methods: [ HttpMethod.GET ],
      integration: lambdatIntegration,
    });
    
  }
}

new NestAppStack();
