import { Table, Model, PrimaryKey, Column, DataType, HasMany } from "sequelize-typescript";
import User from "./User.model";

@Table
export default class Team extends Model<Team> {
    @PrimaryKey
    @Column
    teamCode: string;

    @Column name: string;

    @HasMany(() => User)
    members: User[];
}
