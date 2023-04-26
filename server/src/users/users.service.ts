import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(userEntity)
    private readonly userRepository: Repository<userEntity>,
  ) {}
  async create(post: Partial<userEntity>): Promise<userEntity> {
    return await this.userRepository.save(post);
  }
  async findAll(): Promise<any> {
    const data = await this.userRepository.find();
    console.log(data, 'www');
    return { list: data, count: 123 };
  }
}
