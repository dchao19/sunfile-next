import {Table, Model, IsUUID, PrimaryKey, Column, ForeignKey, BelongsTo} from "sequelize-typescript";
import * as uuid from 'uuid/v4';
import Source from "./Source.model";
import Team from "./Team.model";
import User from "./User.model";

@Table({
    timestamps: true
})
export default class File extends Model<File> {
    @IsUUID(4)
    @PrimaryKey
    @Column
    id: string = uuid();

    @Column title: string;
    @Column url: string;
    @Column published: Date;

    @ForeignKey(() => Source)
    @Column
    sourceId: string;
    @BelongsTo(() => Source)
    source: Source;

    @ForeignKey(() => User)
    @Column
    userId: string;
    @BelongsTo(() => User)
    user: User;
}