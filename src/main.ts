import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Definición de Pipe global en la aplicación para el uso de las validaciones o DTOS
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //limpia la información enviada en la petición
      forbidNonWhitelisted: true, //Filtra la petición y genera error en caso de no se conforme
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  app.setGlobalPrefix('api/v2');
  await app.listen(3000);
}
bootstrap();
