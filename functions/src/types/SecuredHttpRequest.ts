import { HttpRequest } from "azure-functions-ts-essentials";
import { UserData } from "./OktaUser";

export interface SecuredHttpRequest extends HttpRequest {
	user: UserData;
}
