import { NestFactory } from '@nestjs/core';
import { Callback, Context, Handler } from 'aws-lambda';
// import serverlessExpress from '@vendia/serverless-express';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import helmet from 'helmet';
import { AppModule } from './app.module';

const port = process.env.PORT || 4000;
let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  await app.init();

  app.use(helmet());
  app.enableCors();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

const lambdaHandler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.log('App starting!');
  console.log('Event: ', event || 'unknown');
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

module.exports.lambdaHandler;

/*
bootstrap().then(() => {
  console.log('App is running on %s port', port);
});
*/
