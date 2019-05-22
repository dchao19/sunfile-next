import { SecuredHttpRequest } from "./../../../types/SecuredHttpRequest";
import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { withAuth } from "../../../utils/withAuth";

import Team from "../../../models/Team.model";

const run = async (context: Context, req: SecuredHttpRequest) => {
    const teamCode = req.params.teamCode as string;
    if (typeof teamCode === "undefined" || !teamCode || teamCode.length !== 6) {
        context.res = {
            status: HttpStatusCode.BadRequest,
            body: {
                success: false,
                result: null,
                message: "The team code was missing or invalid."
            }
        };
        return;
    }

    if (req.user.teamCode) {
        context.res = {
            status: HttpStatusCode.Conflict,
            body: {
                success: false,
                result: null,
                message: "The user is already joined to a team."
            }
        }
    }

    const team = await Team.findById(teamCode);
    if (!team) {
        context.res = {
            status: HttpStatusCode.NotFound,
            body: {
                success: false,
                result: null,
                message: "The team was not found."
            }
        };
        return;
    }

    try {
        await team.$add("members", req.user);
        context.res = {
            status: HttpStatusCode.OK,
            body: {
                success: true,
                result: team,
                message: "Sucessfully joined the team."
            }
        };
    } catch (e) {
        context.res = {
            status: HttpStatusCode.InternalServerError,
            body: {
                success: false,
                result: e,
                message: "An internal server error occurred."
            }
        };
    }
};

export default withAuth(run);
