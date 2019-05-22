import * as OktaAuth from "@okta/okta-auth-js";
import uuidv4 from "uuid/v4";
import { Route, RawLocation } from "vue-router";

class AuthService {
	scopes: string = "";
	state: string = uuidv4();
	nonce: string = uuidv4();
	redirectUri: string = "http://localhost:8080/implicit/callback";

	authConfig = {
		clientId: process.env.VUE_APP_OKTA_CLIENT_ID,
		issuer: process.env.VUE_APP_OKTA_ISSUER,
		redirectUri: this.redirectUri,
		url: process.env.VUE_APP_OKTA_URL
	};
	urls = {
		issuer: process.env.VUE_APP_OKTA_ISSUER,
		authorizeUrl: process.env.VUE_APP_OKTA_ISSUER + "/v1/authorize",
		userinfoUrl: process.env.VUE_APP_OKTA_ISSUER + "/v1/userinfo"
	};

	okta = new OktaAuth(this.authConfig);

	constructor(options: { scopes: string }) {
		this.scopes = options.scopes;

		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
		this.login = this.login.bind(this);
	}

	get accessToken(): string {
		const token = this.okta.tokenManager.get("accessToken");
		return token ? token.accessToken : undefined;
	}

	get idToken(): string {
		const token = this.okta.tokenManager.get("idToken");
		return token ? token.idToken : undefined;
	}

	get expiresAt(): number {
		const token = this.okta.tokenManager.get("accessToken");
		return token ? token.expiresAt : 0;
	}

	get name(): string { 
		const token = this.okta.tokenManager.get("idToken");
		return token ? token.claims.name : undefined;
	}

	async handleAuthentication(callbackUrl?: string) {
		const tokens = await this.okta.token.parseFromUrl(callbackUrl);
		tokens.forEach((token: any) => {
			if (token.accessToken) this.okta.tokenManager.add("accessToken", token);
			if (token.idToken) this.okta.tokenManager.add("idToken", token);
		});
	}

	isAuthenticated() {
		return !!this.idToken && !!this.accessToken && this.expiresAt * 1000 > (Date.now());
	}

	login() {
        this.okta.token.getWithRedirect({
			responseType: ["token", "id_token"],
			scopes: this.scopes.split(" ")
        });
    }

	authRequired = (to: Route, from: Route, next: (to?: RawLocation) => void) => {
		this.isAuthenticated() ? next() : next("/login");
	};
}

const Auth = new AuthService({ scopes: "openid profile email" });
export default Auth;
