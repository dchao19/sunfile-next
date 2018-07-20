import { HttpRequest } from "azure-functions-ts-essentials";
import User from "../models/User.model";

export interface SecuredHttpRequest extends HttpRequest {
    user: User;
}
