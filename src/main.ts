import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Project IMO')
    .setDescription('Idea management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('doc', app, document);
  await app.listen(process.env.PORT || 3000);
  Logger.log(`Server started running on: ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
