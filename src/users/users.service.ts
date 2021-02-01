import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SbUsers } from './users.entity'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectRepository(SbUsers)
    private readonly usersRepository: Repository<SbUsers>) { }

  async onModuleInit() {
    if (await this.findOneByUsername('admin')) return
    // 初始化系统管理员
    const admin = this.usersRepository.create({
      username: 'admin',
      password: '123',
      email: 'star_ch1028@163.com',
      groupType: 0,
      gid: 1,
      sex: '男',
      nickName: 'admin',
      realName: 'admin'
    })
    await this.usersRepository.save(admin)
  }

  /**
   * 根据用户名查找用户
   * @param username 
   */
  async findOneByUsername(username: string): Promise<SbUsers> {
    return await this.usersRepository.findOne({ username })
  }
}
