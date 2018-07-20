import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { SecuredHttpRequest } from "../../../types/SecuredHttpRequest";
import Team from "../../../models/Team.model";

import { secured } from "../../../utils/tokenVerifier";
import User from "../../../models/User.model";

const run = async (context: Context, req: SecuredHttpRequest) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: [Team] });
    const team = user.team;

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
            result: user.team
        }
    };
};
export default secured(run);
