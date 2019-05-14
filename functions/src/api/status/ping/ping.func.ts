import { Context, HttpRequest, HttpStatusCode } from "azure-functions-ts-essentials";

export async function run(context: Context, req: HttpRequest): Promise<void> {
    context.res = {
        status: HttpStatusCode.OK,
        body: "pong"
    };
}
