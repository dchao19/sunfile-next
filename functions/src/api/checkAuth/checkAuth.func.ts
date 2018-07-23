import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { withAuth } from "../../utils/withAuth";
import { SecuredHttpRequest } from "../../types/SecuredHttpRequest";

export const run = withAuth((context: Context, req: SecuredHttpRequest) => {
    context.res = {
        status: HttpStatusCode.OK,
        body: {
            success: true,
            message: null,
            result: {
                user: req.user
            }
        }
    };
});
