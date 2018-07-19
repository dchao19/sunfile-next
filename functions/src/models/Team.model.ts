import { Table, Model, IsUUID, PrimaryKey, Column, DataType } from "sequelize-typescript";

@Table
export default class Team extends Model<Team> {
	@IsUUID(5)
	@PrimaryKey
	@Column
	id: string;

	@Column name: string;

	@Column teamCode: string;

	@Column captainId: string;

	@Column(DataType.ARRAY(DataType.STRING))
	members: string[];
}
