import { Context, HttpRequest, HttpStatusCode } from "azure-functions-ts-essentials";
import { secured } from "../../utils/tokenVerifier";

export const run = secured((context: Context, req: HttpRequest) => {
    context.res = {
        status: HttpStatusCode.OK,
        body: {
            success: true,
            message: null,
            result: null
        }
    };
});
