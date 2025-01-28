import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentBuilderConfig = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription('Booking seats')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilderConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 4567);
  console.log(
    `Click here to Open Documentation on Swagger :) => http://localhost:4567/docs`,
  );
}
bootstrap();
