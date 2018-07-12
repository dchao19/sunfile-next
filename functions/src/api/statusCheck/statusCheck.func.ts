import { Context, HttpRequest, HttpStatusCode } from "azure-functions-ts-essentials";
import { sequelize } from "../../setups/dbSetup";

export async function run(context: Context, req: HttpRequest): Promise<void> {
    context.log("TypeScript HTTP trigger function processed a request.");

    await sequelize.sync();
    try {
        await sequelize.authenticate();

        context.res = {
            status: HttpStatusCode.OK,
            body: "pong"
        };
    } catch (e) {
        context.res = {
            status: HttpStatusCode.InternalServerError,
            body: null
        };
    }

    context.done();
}
