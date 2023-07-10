import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { HttpApi, HttpMethod }  from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";

export class NestAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // lambdas
    const nestAppLambda = new lambdaNode.NodejsFunction(
      this,
      "nestAppLambdaNew",
      {
        functionName: "nestAppLambdaNew",
        entry: path.join(__dirname, "../../dist/main.js"),
        memorySize: 1024,
        timeout: cdk.Duration.seconds(5),
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "lambdaHandler",
        environment: {},
        bundling: {
          // format: lambdaNode.OutputFormat.CJS,
          externalModules: [
            "class-transformer",
            "class-validator",
            "@nestjs/microservices",
            "@nestjs/websockets",
            "@nestjs/websockets/socket-module",
            "class-validator",
            "@nestjs/microservices/microservices-module",
          ],
        },
      },
    );

    // gateway
    const lambdatIntegration = new HttpLambdaIntegration('CartLambda', nestAppLambda);

    const cartHTTPApi = new HttpApi(this, 'CartHTTPApi', {
    });
    
    cartHTTPApi.addRoutes({
      path: '/cart',
      methods: [ HttpMethod.GET ],
      integration: lambdatIntegration,
    });

    /*
    (this, "widgets-api", {
      restApiName: "Widget Service",  
      description: "This service serves widgets."
    });
    */
    
    //const api = new apigateway.LambdaIntegration(nestAppLambda);
  }
}
