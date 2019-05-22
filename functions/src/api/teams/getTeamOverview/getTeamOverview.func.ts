import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { SecuredHttpRequest } from "@/types/SecuredHttpRequest";

import { withAuth } from "@/utils/withAuth";

import Team from "@/models/Team.model";
import File from "@/models/File.model";
import User from "@/models/User.model";
import { sequelize } from "@/setups/dbSetup";

const run = async (context: Context, req: SecuredHttpRequest) => {
    const teamCode = req.params.teamCode;
    if (typeof teamCode !== "string" || !teamCode || teamCode.length < 6) {
        context.res = {
            status: HttpStatusCode.BadRequest,
            body: {
                success: false,
                result: null,
                message: "The team code was missing or invalid"
            }
        };
        return;
    }

    const team = await Team.findById(teamCode);
    if (!team) {
        context.res = {
            status: HttpStatusCode.NotFound,
            body: {
                success: false,
                result: null,
                message: "The team could not be found"
            }
        };
        return;
    }

    const [{ count: userCount }, { count: teamCount }] = await Promise.all([
        File.findAndCountAll({
            where: {
                userId: req.user.id
            }
        }),
        File.findAndCountAll({
            include: [
                {
                    model: User,
                    where: {
                        teamCode
                    }
                }
            ]
        })
    ]);

    context.res = {
        status: HttpStatusCode.OK,
        body: {
            success: true,
            result: {
                teamCode: team.teamCode,
                name: team.name,
                userCount,
                teamCount
            }
        }
    };
};

export default withAuth(run);
