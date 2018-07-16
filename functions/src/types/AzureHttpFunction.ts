import { Context, HttpRequest } from "azure-functions-ts-essentials";
import { SecuredHttpRequest } from "./SecuredHttpRequest";

export type AzureHttpFunction = (
	context: Context,
	req: HttpRequest
) => void | Promise<void>;

export type SecuredAzureHttpFunction = (
	context: Context,
	req: SecuredHttpRequest
) => void | Promise<void>;
