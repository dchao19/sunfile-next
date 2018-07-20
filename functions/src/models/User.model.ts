import * as uuid from "uuid/v4";
import { Table, Model, IsUUID, PrimaryKey, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import Team from "./Team.model";

@Table
export default class User extends Model<User> {
    @IsUUID(4)
    @PrimaryKey
    @Column
    id: string = uuid();

    @Column name: string;

    @Column oktaUserId: string;

    @ForeignKey(() => Team)
    @Column
    teamCode: string;

    @BelongsTo(() => Team)
    team: Team;

    @Column isCaptain: boolean;
}
