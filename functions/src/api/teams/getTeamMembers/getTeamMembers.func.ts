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

    const files = await User.findAll({
        attributes: [
            "name",
            "User.id",
            [
                sequelize.fn("COUNT", sequelize.col("userFiles.id")),
                "numArticles"
            ]
        ],
        where: {
            teamCode: req.user.teamCode
        },
        include: [
            {
                model: File,
                attributes: []
            }
        ],
        group: ["User.id", "User.name"]
    });
    context.res = {
        status: HttpStatusCode.OK,
        body: {
            success: true,
            result: files,
            message: "Success"
        }
    };
};

export default withAuth(run);
