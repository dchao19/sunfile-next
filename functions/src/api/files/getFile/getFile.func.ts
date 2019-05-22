import {
    Context,
    HttpStatusCode,
    HttpRequest
} from "azure-functions-ts-essentials";

const run = async (context: Context, req: HttpRequest) => {
    if (!context.bindings.fileData || context.bindings.fileData.length === 0) {
        context.res = {
            status: HttpStatusCode.NotFound,
            body: {
                success: false,
                result: null,
                message: "The requested file could not be found!"
            }
        };
        return;
    }

    context.res = {
        status: HttpStatusCode.OK,
        isRaw: true,
        body: context.bindings.fileData,
        headers: {
            "content-type":
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }
    };
};

export default run;
