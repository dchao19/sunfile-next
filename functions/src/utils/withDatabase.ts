import { AzureHttpFunction } from "../types/AzureHttpFunction";
import { Context, HttpRequest } from "../../node_modules/azure-functions-ts-essentials";
import { sequelize } from "../setups/dbSetup";

const withDatabase = (next: AzureHttpFunction): AzureHttpFunction => {
    return async (context: Context, req: HttpRequest) => {
        if (process.env.NODE_ENV === "development") {
            await sequelize.sync();
        }

        await next(context, req);
    };
};

export { withDatabase };
