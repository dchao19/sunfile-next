import {Context, HttpStatusCode} from "azure-functions-ts-essentials";
import {SecuredHttpRequest} from "@/types/SecuredHttpRequest";

import {withAuth} from "@/utils/withAuth";
import Source from "@/models/Source.model";

const run = async (context: Context, req: SecuredHttpRequest) => {
    const { name, code, rootUrl } = req.body as { name?: string, code?: string, rootUrl?: string};

    if (typeof name === "undefined" ||
        typeof code === "undefined" ||
        typeof rootUrl === "undefined" ||
        !name || !code || !rootUrl) {
        context.res = {
            status: HttpStatusCode.BadRequest,
            body: {
                success: false,
                result: null,
                message: "Either the name, code, or rootUrl was not specified in the request."
            }
        };
        return;
    }

    const source = new Source({
        name,
        code,
        rootUrl
    });

    try {
        await source.save();

        context.res = {
            status: HttpStatusCode.Created,
            body: {
                success: true,
                result: source,
                message: "The source was created."
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
        }
    }

};

export default withAuth(run);