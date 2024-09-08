import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle("PoggersLoggers API")
    .setDescription("PoggersLoggers exercise tracker API")
    .setVersion("1.0")
    .addTag("PoggersLoggers")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = app.get(ConfigService).get<number>("API_PORT");

  await app.listen(port);
}

bootstrap();
