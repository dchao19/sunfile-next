import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { secured } from "../../utils/tokenVerifier";
import { SecuredHttpRequest } from "../../types/SecuredHttpRequest";

export const run = secured((context: Context, req: SecuredHttpRequest) => {
	context.res = {
		status: HttpStatusCode.OK,
		body: {
			success: true,
			message: null,
			result: {
				user: req.user
			}
		}
	};
});
