import { Sequelize } from "sequelize-typescript";
import Source from "../models/Source.model";
import Team from "../models/Team.model";
import User from "../models/User.model";
import File from "../models/File.model";

console.log(process.env.DB_PASSWORD);

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    dialect: "mssql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
        encrypt: process.env.DB_ENCRYPT
    }
});

sequelize.addModels([Source, Team, User, File]);

export { sequelize };
