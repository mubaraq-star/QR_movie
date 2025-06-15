import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ Security middleware — allow 3rd-party images
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      // Optionally add other Helmet policies if you need
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  });

  // ✅ View engine config
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('ejs'); // ❌ remove duplicate line

  // ✅ Swagger setup
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
