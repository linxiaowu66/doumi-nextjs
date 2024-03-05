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

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "douMiBlog",
  synchronize: false,
  logging: false,
  entities: [Archive, Article, Category, Reader, Tag, User, Website],
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
