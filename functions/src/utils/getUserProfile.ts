import fetch from "node-fetch";
import { json } from "body-parser";

export const getUserProfile = async (accessToken: string) => {
    const res = await fetch(`${process.env.OKTA_ISSUER}/v1/userinfo`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return await res.json();
};
