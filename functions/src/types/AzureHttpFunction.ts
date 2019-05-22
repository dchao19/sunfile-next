import { Context, HttpRequest } from "azure-functions-ts-essentials";
import { SecuredHttpRequest } from "./SecuredHttpRequest";

export type AzureHttpFunction = (
    context: Context,
    req: HttpRequest
) => any | Promise<any>;

export type SecuredAzureHttpFunction = (
    context: Context,
    req: SecuredHttpRequest
) => any | Promise<any>;
