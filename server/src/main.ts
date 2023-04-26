import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './filter/http-exception';
import { ApiExceptionFilter } from './filter/http-exception';
import { ApiTransformInterceptor } from './filter/api-transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 设置全局路由前缀
  app.useGlobalFilters(new ApiExceptionFilter());
  app.useGlobalInterceptors(new ApiTransformInterceptor(new Reflector()));
  await app.listen(3000);
}
bootstrap();
