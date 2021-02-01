import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SbUsers } from './users.entity'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectRepository(SbUsers)
    private readonly SbUsersRepository: Repository<SbUsers>) { }

  async onModuleInit() {
    if (await this.findOneByUsername('admin')) return
    // 初始化系统管理员
    const admin = this.SbUsersRepository.create({
      username: 'admin',
      password: '123',
      email: 'star_ch1028@163.com',
      groupType: 0,
      gid: 1,
      sex: '男',
      nickName: 'admin',
      realName: 'admin'
    })
    await this.SbUsersRepository.save(admin)
  }

  /**
   * 注册用户
   * @param user 用户信息 
   */
  async register(user: SbUsers): Promise<void> {
    const existing = await this.findOneByUsername(user.username)
    if (existing) {
      throw new HttpException('账号已存在', 409)
    }
    // 加密处理密码
    user.password = ''
    await this.SbUsersRepository.save(this.SbUsersRepository.create(user)) 
  }

  /**
   * 判断用户是否可以登陆
   * @param username 
   * @param password 
   */
  async login(username: string, password: string): Promise<void> {

  }

  /**
   * 更新用户信息
   * @param user 
   */
  async update(uid: number, user: SbUsers): Promise<void> {
    const existing = await this.SbUsersRepository.findOne({ uid })
    if (!existing) {
      throw new HttpException(`更新失败, ID为${uid}的用户不存在`, 404)
    }
    await this.SbUsersRepository.save(user)
  }

  async delete(uid: number): Promise<void> {
    const existing = await this.SbUsersRepository.findOne({ uid })
    if (!existing) {
      throw new HttpException(`删除失败, ID为${uid}的用户不存在`, 404)
    }
    await this.SbUsersRepository.remove(existing)
  }

  async findOneByUid(uid: number): Promise<SbUsers> {
    return await this.SbUsersRepository.findOne({ uid })
  }

  /**
   * 根据用户名查找用户
   * @param username 
   */
  async findOneByUsername(username: string): Promise<SbUsers> {
    return await this.SbUsersRepository.findOne({ username })
  }

  async findOneByEmail(email: string): Promise<SbUsers> {
    return await this.SbUsersRepository.findOne({ email })
  }

  /**
   * 分页获取数据
   */
  async findAllUsers(pageNumber: number, pageSize: number) {
    const db = this.SbUsersRepository.createQueryBuilder('users')
    return await db.skip(pageSize * (pageNumber - 1)).take(pageSize).orderBy({'users.id': 'DESC'}).getManyAndCount()
  }
}
