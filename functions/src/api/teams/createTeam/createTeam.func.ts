import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { SecuredHttpRequest } from "../../../types/SecuredHttpRequest";
import Team from "../../../models/Team.model";
import { generateTeamCode } from "../../../utils/generateTeamCode";

import { secured } from "../../../utils/tokenVerifier";
import { withDatabase } from "../../../utils/withDatabase";

const run = (context: Context, req: SecuredHttpRequest) => {
	const name = req.body.teamName as string;
	if (typeof name === "undefined" || !name) {
		context.res = {
			status: HttpStatusCode.BadRequest,
			body: {
				success: false,
				result: null,
				message: "No team name was specified in the request."
			}
		};
		return;
	}

	const teamCode = generateTeamCode();
	try {
		const newTeam = Team.create({
			name,
			teamCode,
			captainId: req.user.sub,
			members: [req.user.sub]
		});
		context.res = {
			status: HttpStatusCode.Created,
			body: {
				success: true,
				result: newTeam,
				message: "The team was successfully created."
			}
		};
	} catch (e) {
		context.res = {
			status: HttpStatusCode.InternalServerError,
			body: {
				success: false,
				result: null,
				message: "An internal server error occurred."
			}
		};
	}
};

export default secured(withDatabase(run));
