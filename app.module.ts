import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users/users.controller';
import { CateService } from './cate/cate.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'chenh@1028',
      database: 'dfyjbbs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    })
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, CateService],
})
export class AppModule {}
