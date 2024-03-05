import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Article } from "./article";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 200,
    nullable: false,
  })
  @Index({ unique: true })
  name: string;

  @OneToMany("Article", "category")
  articles: Article[];

  @CreateDateColumn()
  public readonly createdAt!: Date;

  @UpdateDateColumn()
  public readonly updatedAt!: Date;
}
