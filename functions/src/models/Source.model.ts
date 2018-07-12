import { Table, Model, IsUUID, PrimaryKey, Column } from "sequelize-typescript";

@Table
export default class Source extends Model<Source> {
    @IsUUID(5)
    @PrimaryKey
    @Column
    id: string;

    @Column rootUrl: string;

    @Column longName: string;

    @Column code: string;
}
