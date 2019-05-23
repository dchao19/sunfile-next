import * as OktaJwtVerifier from "@okta/jwt-verifier";
import {
    Context,
    HttpRequest,
    HttpStatusCode
} from "azure-functions-ts-essentials";
import * as uuid from "uuid/v4";

import {
    AzureHttpFunction,
    SecuredAzureHttpFunction
} from "../types/AzureHttpFunction";
import { AccessTokenClaims } from "../types/OktaUser";

import { withDatabase } from "./withDatabase";
import User from "../models/User.model";
import { getUserProfile } from "./getUserProfile";

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: process.env.OKTA_ISSUER
});

const extractTokenFromHeader = (header: string): string => {
    return header.split(" ")[1];
};

const withAuth = (next: SecuredAzureHttpFunction): AzureHttpFunction => {
    return withDatabase(async (context: Context, req: HttpRequest) => {
        const authorizationHeader = req.headers["authorization"];
        if (
            typeof authorizationHeader === "undefined" ||
            !authorizationHeader
        ) {
            context.res = {
                status: HttpStatusCode.Unauthorized,
                body: {
                    success: false,
                    result: null,
                    message: "Access denied: missing authorization header."
                }
            };
            return;
        }

        try {
            const accessToken = extractTokenFromHeader(authorizationHeader);
            const authResult = await oktaJwtVerifier.verifyAccessToken(
                accessToken
            );
            const claims = authResult.claims as AccessTokenClaims;

            let user = await User.findOne({
                where: {
                    oktaUserId: claims.uid
                }
            });

            if (!user) {
                const profile = await getUserProfile(accessToken);
                user = new User({
                    oktaUserId: claims.uid,
                    isCaptain: false,
                    name: profile.name,
                    id: uuid()
                });
                await user.save();
            }

            const authorizedReq = { ...req, user };
            await next(context, authorizedReq);
        } catch (e) {
            context.log.error(e);
            context.res = {
                status: HttpStatusCode.Unauthorized,
                body: {
                    success: false,
                    result: null,
                    message:
                        "Access denied: token missing, malformed, or failed validation."
                }
            };
            return;
        }
    });
};

export { withAuth };
