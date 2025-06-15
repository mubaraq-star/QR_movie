import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  });

  
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('ejs'); 


  const config = new DocumentBuilder()
    .setTitle('QR-Movies API')
    .setDescription('Generate rotating QR codes and fetch 10 random movies')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  console.log(`🚀 Server running at http://localhost:3000`);
}
bootstrap();
