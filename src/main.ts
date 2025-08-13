import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';

let server: Server;

export default async function handler(req: any, res: any) {
  if (!server) {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*'
    });
    await app.init();
    server = app.getHttpAdapter().getInstance();
  }

  server(req, res);
}
// bootstrap();
