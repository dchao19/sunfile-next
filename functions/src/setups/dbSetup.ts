import { Sequelize } from "sequelize-typescript";
import Source from "../models/Source.model";
import Team from "../models/Team.model";
import User from "../models/User.model";

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    dialect: "mssql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

sequelize.addModels([Source, Team, User]);

export { sequelize };
