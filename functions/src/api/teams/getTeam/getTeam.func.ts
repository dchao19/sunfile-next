import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { SecuredHttpRequest } from "../../../types/SecuredHttpRequest";
import Team from "../../../models/Team.model";

import { withAuth } from "../../../utils/withAuth";
import User from "../../../models/User.model";
import File from "@/models/File.model";
import { sequelize } from "@/setups/dbSetup";

const run = async (context: Context, req: SecuredHttpRequest) => {
    const team = await Team.findOne({
        where: {
            teamCode: req.user.teamCode
        }
    });

    if (!team) {
        context.res = {
            status: HttpStatusCode.NotFound,
            body: {
                success: false,
                result: null,
                message: "not-found"
            }
        };
        return;
    }

    context.res = {
        status: HttpStatusCode.OK,
        body: {
            success: true,
            result: team
        }
    };
};
export default withAuth(run);
