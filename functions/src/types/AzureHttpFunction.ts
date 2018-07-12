import { Context, HttpRequest } from "azure-functions-ts-essentials";

type AzureHttpFunctionSync = (context: Context, req: HttpRequest) => void;
type AzureHttpFunctionAsync = (context: Context, req: HttpRequest) => Promise<void>;

export type AzureHttpFunction = AzureHttpFunctionSync | AzureHttpFunctionAsync;
