export type AccessTokenClaims = {
    ver: string;
    jti: string;
    aud: string;
    iat: number;
    exp: number;
    cid: string;
    uid: string;
    scp: string[];
    sub: string;
};
