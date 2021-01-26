import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  BaseEntity
} from 'typeorm'

@Entity()
export class CateEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  cid: number

  @PrimaryColumn()
  pid: number

  @Column()
  cname: string

  @Column()
  content: string

  @Column()
  keywords: string

  @Column()
  ico: string

  @Column()
  master: string

  @Column()
  permit: string

  @Column({
    type: 'mediumint'
  })
  listnum: number

  @Column()
  clevel: string

  @Column()
  cord: number
}
