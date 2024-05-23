import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

// 只会保存7天内的数据

@Entity()
export class Website {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("bigint")
  todayUv: number;

  @Column("simple-array")
  todayIps: string[];

  @Column("bigint")
  todayPv: number;

  // 废弃，之前是为了计算今天和昨天的一个增长百分比
  @Column("bigint")
  yesterdayPv: number;

  // 废弃
  @Column("bigint")
  yesterdayUv: number;

  // 废弃，总数直接实时累加
  @Column("bigint")
  totalUv: number;

  // 废弃
  @Column("bigint")
  totalPv: number;

  @Column({
    type: "varchar",
    length: 200,
    nullable: false,
    unique: true, // 设置唯一
  })
  date: string;

  @CreateDateColumn()
  public readonly createdAt!: Date;

  @UpdateDateColumn()
  public readonly updatedAt!: Date;
}
