import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([userEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}