import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { SecuredHttpRequest } from "@/types/SecuredHttpRequest";

import { generateTeamCode } from "@/utils/generateTeamCode";
import { withAuth } from "@/utils/withAuth";

import User from "@/models/User.model";
import Team from "@/models/Team.model";

const run = async (context: Context, req: SecuredHttpRequest) => {
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
        const newTeam = new Team(
            {
                name,
                teamCode
            },
            {
                include: [User]
            }
        );
        await newTeam.save();
        await newTeam.$add("members", req.user);

        context.res = {
            status: HttpStatusCode.Created,
            body: {
                success: true,
                result: newTeam,
                message: "The team was successfully created."
            }
        };
    } catch (e) {
        console.log(e);
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

export default withAuth(run);
