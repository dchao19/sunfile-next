import { getCookie, setCookie } from "./cookies";
import * as OktaAuth from "@okta/okta-auth-js";
import uuidv4 from "uuid/v4";
import { Route, Location, RawLocation } from "vue-router";

class AuthService {
    okta = new OktaAuth({
        clientId: process.env.VUE_APP_OKTA_CLIENT_ID,
        issuer: process.env.VUE_APP_OKTA_ISSUER,
        redirectUri: chrome.identity.getRedirectURL(),
        url: process.env.VUE_APP_OKTA_URL
    });
    urls = {
        issuer: process.env.VUE_APP_OKTA_ISSUER,
        authorizeUrl: process.env.VUE_APP_OKTA_ISSUER + "/v1/authorize",
        userinfoUrl: process.env.VUE_APP_OKTA_ISSUER + "/v1/userinfo"
    };

    scopes: string = "";
    state: string = uuidv4();
    nonce: string = uuidv4();

    constructor(options: { scopes: string }) {
        this.scopes = options.scopes;

        this.setOAuthParamCookie = this.setOAuthParamCookie.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.login = this.login.bind(this);
    }

    get accessToken(): string {
        const token = this.okta.tokenManager.get("accessToken");
        return token ? token : undefined;
    }

    get idToken(): string {
        const token = this.okta.tokenManager.get("idToken");
        return token ? token : undefined;
    }

    setOAuthParamCookie() {
        const params = {
            responseType: ["token", "id_token"],
            state: this.state,
            nonce: this.nonce,
            scopes: this.scopes,
            urls: this.urls
        };

        setCookie(process.env.VUE_APP_OAUTH_PARAMS_COOKIE_NAME as string, JSON.stringify(params));
        setCookie(process.env.VUE_APP_STATE_COOKIE_NAME as string, this.state);
        setCookie(process.env.VUE_APP_NONCE_COOKIE_NAME as string, this.nonce);
    }

    authorizeUrl(): string {
        const baseUrl = `${this.urls.authorizeUrl}?`;
        const redirectUrl = chrome.identity.getRedirectURL();

        const params: { [key: string]: string } = {
            client_id: process.env.VUE_APP_OKTA_CLIENT_ID as string,
            nonce: this.nonce,
            redirect_uri: redirectUrl,
            response_type: "token id_token",
            scope: this.scopes,
            state: this.state
        };

        const formattedParams = new URLSearchParams();
        Object.keys(params).forEach(key => formattedParams.append(key, params[key]));

        return baseUrl + formattedParams.toString();
    }

    async handleAuthentication(callbackUrl: string) {
        const tokens = await this.okta.token.parseFromUrl(callbackUrl);
        tokens.forEach((token: any) => {
            if (token.accessToken) this.okta.tokenManager.add("accessToken", token);
            if (token.idToken) this.okta.tokenManager.add("idToken", token);
        });
    }

    async notifyAuthenticated() {
        return chrome.notifications.create(uuidv4(), {
            type: "basic",
            iconUrl: "icons/icon128.png",
            title: "You're all set!",
            message:
                "You've signed in successfully. To use Sunfile, please open the extension again."
        });
    }

    isAuthenticated() {
        return !!this.idToken && !!this.accessToken;
    }

    login() {
        this.setOAuthParamCookie();
        chrome.identity.launchWebAuthFlow(
            {
                url: this.authorizeUrl(),
                interactive: true
            },
            async redirected => {
                if (redirected) {
                    await this.handleAuthentication(redirected);
                    await this.notifyAuthenticated();
                }
            }
        );
    }

    authRequired = (to: Route, from: Route, next: (to?: RawLocation) => void) => {
        console.log(this.isAuthenticated());
        this.isAuthenticated() ? next() : next("/login");
    };
}

const Auth = new AuthService({ scopes: "openid profile email" });
export default Auth;
