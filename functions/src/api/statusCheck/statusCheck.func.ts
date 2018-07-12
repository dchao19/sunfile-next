import { Context, HttpRequest, HttpStatusCode } from "azure-functions-ts-essentials";

export async function run(context: Context, req: HttpRequest): Promise<void> {
    context.log("api/ping received a request");

    context.res = {
        status: HttpStatusCode.OK,
        body: "pong"
    };

    context.done();
}
