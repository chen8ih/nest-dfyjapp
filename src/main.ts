import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 替换 console 为更统一友好的
const { log, warn, info } = console;
const color = c => c
global.console = Object.assign(console, {
  log: (...args) => log('[log]', ...args),
  warn: (...args) => warn(color('\x1b[33m%s\x1b[0m'), '[warn]', '[dfyj]', ...args),
  info: (...args) => info(color('\x1b[34m%s\x1b[0m'), '[info]', '[dfyj]', ...args),
  error: (...args) => info(color('\x1b[31m%s\x1b[0m'), '[error]', '[dfyj]', ...args),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  // app.useStaticAssets(join(__dirname, '..', 'public'), {
  //   prefix: '/static/',   //设置虚拟路径
  // });
  await app.listen(3000);
}
bootstrap();
