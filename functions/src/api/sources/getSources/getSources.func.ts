import {Context, HttpStatusCode} from "azure-functions-ts-essentials";
import {SecuredHttpRequest} from "@/types/SecuredHttpRequest";

import {withAuth} from "@/utils/withAuth";
import Source from "@/models/Source.model";

const run = async (context: Context, req: SecuredHttpRequest) => {
    try {
        const sources = await Source.findAll();

        context.res = {
            status: HttpStatusCode.OK,
            body: {
                success: true,
                result: sources,
                message: "The sources were successfully retrieved."
            }
        }
    } catch (e) {
        context.res = {
            status: HttpStatusCode.InternalServerError,
            body: {
                success: false,
                result: null,
                message: "An internal server error occurred."
            }
        }
    }
};

export default withAuth(run);