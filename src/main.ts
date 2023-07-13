import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import helmet from 'helmet';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.init();

  app.use(helmet());
  app.enableCors();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.log('Incoming event');
  console.log(event);
  try {
    server = server ?? (await bootstrap());
    if (event?.queryStringParameters?.test === '') {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: '/cart route test ok',
        })
      }
    }
    return server(event, context, callback);
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: 'Internal Server Error',
      })
    }
  }
};
