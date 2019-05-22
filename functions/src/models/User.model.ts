import {
    Table,
    Model,
    IsUUID,
    PrimaryKey,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany
} from "sequelize-typescript";
import Team from "./Team.model";
import File from "./File.model";

@Table
export default class User extends Model<User> {
    @IsUUID(4)
    @PrimaryKey
    @Column
    id: string;

    @Column name: string;

    @Column oktaUserId: string;

    @ForeignKey(() => Team)
    @Column
    teamCode: string;

    @BelongsTo(() => Team)
    team: Team;

    @HasMany(() => File)
    userFiles: File[];

    @Column isCaptain: boolean;
}
