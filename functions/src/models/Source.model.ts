import {Table, Model, IsUUID, PrimaryKey, Column, HasMany} from "sequelize-typescript";
import * as uuid from 'uuid/v4';

import File from './File.model'

@Table
export default class Source extends Model<Source> {
    @IsUUID(4)
    @PrimaryKey
    @Column
    id: string = uuid();

    @Column rootUrl: string;

    @Column name: string;

    @Column code: string;

    @HasMany(() => File)
    files: File;
}
