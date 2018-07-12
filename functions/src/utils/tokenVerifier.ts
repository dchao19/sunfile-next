import * as OktaJwtVerifier from "@okta/jwt-verifier";
import { Context, HttpRequest, HttpStatusCode } from "azure-functions-ts-essentials";
import { AzureHttpFunction } from "../types/AzureHttpFunction";

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: process.env.OKTA_ISSUER
});

const extractTokenFromHeader = (header: string): string => {
    return header.split(" ")[1];
};

const secured = (next: AzureHttpFunction): AzureHttpFunction => {
    return async (context: Context, req: HttpRequest) => {
        const authorizationHeader = req.headers["Authorization"];
        if (typeof authorizationHeader === "undefined" || !authorizationHeader) {
            context.res = {
                status: HttpStatusCode.Unauthorized,
                body: {
                    success: false,
                    result: null,
                    message: "Access denied: missing authorization header."
                }
            };
            return context.done();
        }

        try {
            const accessToken = extractTokenFromHeader(authorizationHeader);
            const authResult = await oktaJwtVerifier.verifyAccessToken(accessToken);

            const authorizedReq = { ...req, user: authResult.claims };
            next(context, authorizedReq);
        } catch (e) {
            context.res = {
                status: HttpStatusCode.Unauthorized,
                body: {
                    success: false,
                    result: null,
                    message: "Access denied: token missing, malformed, or failed validation."
                }
            };
            return context.done();
        }
    };
};

export { secured };
