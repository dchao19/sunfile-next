import { randomBytes } from "crypto";

export const generateTeamCode = () =>
	randomBytes(3)
		.toString("hex")
		.toUpperCase();
