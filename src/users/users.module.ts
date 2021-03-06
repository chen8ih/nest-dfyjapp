import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';

import { SbUsers } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SbUsers])],
  controllers: [],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes()
  }
}
