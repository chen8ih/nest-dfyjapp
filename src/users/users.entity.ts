import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("username", ["username"], { unique: true })
@Entity("sb_users", { schema: "dfyjbbs" })
export class SbUsers {
  @PrimaryGeneratedColumn({ type: "int", name: "uid" })
  uid: number;

  @Column("varchar", { name: "username", unique: true, length: 20 })
  username: string;

  @Column("varchar", { name: "password", length: 48 })
  password: string;

  @Column("char", { name: "openid", nullable: true, length: 32 })
  openid: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 50 })
  email: string | null;

  @Column("varchar", { name: "avatar", nullable: true, length: 100 })
  avatar: string | null;

  @Column("varchar", { name: "homepage", nullable: true, length: 50 })
  homepage: string | null;

  @Column("int", { name: "money", nullable: true, default: () => "'100'" })
  money: number | null;

  @Column("text", { name: "signature", nullable: true })
  signature: string | null;

  @Column("int", { name: "forums", nullable: true, default: () => "'0'" })
  forums: number | null;

  @Column("int", { name: "replies", nullable: true, default: () => "'0'" })
  replies: number | null;

  @Column("smallint", { name: "notices", nullable: true, default: () => "'0'" })
  notices: number | null;

  @Column("int", { name: "follows", default: () => "'0'" })
  follows: number;

  @Column("int", { name: "regtime", nullable: true })
  regtime: number | null;

  @Column("int", { name: "lastlogin", nullable: true })
  lastlogin: number | null;

  @Column("int", { name: "lastpost", nullable: true })
  lastpost: number | null;

  @Column("varchar", { name: "qq", nullable: true, length: 20 })
  qq: string | null;

  @Column("tinyint", {
    primary: true,
    name: "group_type",
    default: () => "'0'",
  })
  groupType: number;

  @Column("tinyint", { name: "gid", default: () => "'3'" })
  gid: number;

  @Column("char", { name: "ip", nullable: true, length: 15 })
  ip: string | null;

  @Column("varchar", { name: "location", nullable: true, length: 128 })
  location: string | null;

  @Column("varchar", { name: "token", nullable: true, length: 40 })
  token: string | null;

  @Column("text", { name: "introduction", nullable: true })
  introduction: string | null;

  @Column("tinyint", { name: "is_active", width: 1, default: () => "'1'" })
  isActive: boolean;

  @Column("varchar", { name: "sex", length: 8 })
  sex: string;

  @Column("varchar", { name: "dept_info", length: 256, default: ()=> "''"})
  deptInfo: string;

  @Column("varchar", { name: "nick_name", length: 48 })
  nickName: string;

  @Column("varchar", { name: "real_name", length: 48 })
  realName: string;
}
