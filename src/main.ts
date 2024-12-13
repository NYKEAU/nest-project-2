// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalAuthGuard } from './auth/guards/global-auth.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('CO2 Tracker API')
    .setDescription('The CO2 Tracker API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS
  app.enableCors();
  
  // Apply global authentication guard
  app.useGlobalGuards(new GlobalAuthGuard(app.get(Reflector)));
  
  await app.listen(3000);
}
bootstrap();