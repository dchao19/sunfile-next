import { getCookie, setCookie } from "@/utils/cookies";
import * as OktaAuth from "@okta/okta-auth-js";
import uuidv4 from "uuid/v4";
import { Route, Location, RawLocation } from "vue-router";
import { isExtension } from "@/utils/isExtension";

class AuthService {
	scopes: string = "";
	state: string = uuidv4();
	nonce: string = uuidv4();
	redirectUri: string = isExtension()
		? chrome.identity.getRedirectURL()
		: "http://localhost:8080/implicit/callback";

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

		setCookie(
			process.env.VUE_APP_OAUTH_PARAMS_COOKIE_NAME as string,
			JSON.stringify(params)
		);
		setCookie(process.env.VUE_APP_STATE_COOKIE_NAME as string, this.state);
		setCookie(process.env.VUE_APP_NONCE_COOKIE_NAME as string, this.nonce);
	}

	authorizeUrl(): string {
		const baseUrl = `${this.urls.authorizeUrl}?`;

		const params: { [key: string]: string } = {
			client_id: process.env.VUE_APP_OKTA_CLIENT_ID as string,
			nonce: this.nonce,
			redirect_uri: this.redirectUri,
			response_type: "token id_token",
			scope: this.scopes,
			state: this.state
		};

		const formattedParams = new URLSearchParams();
		Object.keys(params).forEach(key =>
			formattedParams.append(key, params[key])
		);

		return baseUrl + formattedParams.toString();
	}

	async handleAuthentication(callbackUrl?: string) {
		const tokens = await this.okta.token.parseFromUrl(callbackUrl);
		tokens.forEach((token: any) => {
			if (token.accessToken) this.okta.tokenManager.add("accessToken", token);
			if (token.idToken) this.okta.tokenManager.add("idToken", token);
		});
	}

	notifyAuthenticated() {
		chrome.notifications.create(uuidv4(), {
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
		isExtension() ? this.extensionLogin() : this.redirectLogin();
	}

	extensionLogin() {
		this.setOAuthParamCookie();
		chrome.identity.launchWebAuthFlow(
			{
				url: this.authorizeUrl(),
				interactive: true
			},
			async redirected => {
				if (redirected) {
					await this.handleAuthentication(redirected);
					this.notifyAuthenticated();
				}
			}
		);
	}

	redirectLogin() {
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
