import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  Archive,
  Article,
  Category,
  Reader,
  Tag,
  User,
  Website,
} from "./entities";
import { VisitCity } from "./entities/visitcity";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER, // 替换成你自己的用户名
  password: process.env.DB_PASS, // 替换成你自己的密码
  database: "douMiBlog",
  synchronize: false,
  logging: false,
  entities: [Archive, Article, Category, Reader, Tag, User, Website, VisitCity],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

// 确保已经初始化完成，否则会报错：EntityMetadataNotFoundError: No metadata for "Article" was found.
export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};
