import * as request from "request-promise-native";
import { json } from "body-parser";

export const getUserProfile = async (accessToken: string) => {
    return await request(`${process.env.OKTA_ISSUER}/v1/userinfo`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        method: "GET",
        json: true
    });
};
