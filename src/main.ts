import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// api文档插件
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
  // https://blog.csdn.net/weixin_43902189/article/details/102748102
  // DocumentBuilder是一个辅助类，有助于结构的基本文件SwaggerModule。它包含几种方法，可用于设置诸如标题，描述，版本等属性。
  const options = new DocumentBuilder()
    .setTitle('DFYJ论坛接口文档')
    .setDescription('使用Nest书写的Restful接口') // 文档介绍
    .setVersion('1.0.0') // 文档版本
    .addTag('用户,安全') // 每个tag标签都可以对应着几个@ApiUseTags('用户,安全') 然后被ApiUseTags注释，字符串一致的都会变成同一个标签下的
    // .setBasePath('http://localhost:5000')
    .build();
  // 为了创建完整的文档（具有定义的HTTP路由），我们使用类的createDocument()方法SwaggerModule。此方法带有两个参数，分别是应用程序实例和基本Swagger选项。
  const document = SwaggerModule.createDocument(app, options)
  // 最后一步是setup()。它依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
  SwaggerModule.setup('/api', app, document)
  // app.useStaticAssets(join(__dirname, '..', 'public'), {
  //   prefix: '/static/',   //设置虚拟路径
  // });
  await app.listen(3000);
}
bootstrap();
