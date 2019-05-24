import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { SecuredHttpRequest } from "@/types/SecuredHttpRequest";
import { withAuth } from "@/utils/withAuth";

import * as textConverter from "html-to-text";
import { parse } from "@sunfile/parser";
import { transliterate as tr } from "transliteration";
import { decode } from "iconv-lite";

const run = async (context: Context, req: SecuredHttpRequest) => {
    let url = req.query.url;
    if (typeof url !== "string") {
        context.res = {
            status: HttpStatusCode.BadRequest,
            body: {
                success: false,
                result: null,
                message: "The url was not specified in the request!"
            }
        };
        return;
    }

    url = decodeURIComponent(url);
    const content = await parse(url);

    const decoded = tr(decode(Buffer.from(content.content), "utf8"));
    const text = textConverter.fromString(decoded, {
        wordwrap: false,
        ignoreHref: true,
        ignoreImage: true,
        singleNewLineParagraphs: true,
        uppercaseHeadings: false
    });

    context.res = {
        status: HttpStatusCode.OK,
        body: {
            success: true,
            result: {
                metadata: content,
                paragraphs: text.split("\n").map(text => {
                    return {
                        content: [{ beforeHighlight: text, highlight: "" }]
                    };
                })
            },
            message: "Article data successfully extracted."
        }
    };
};

export default withAuth(run);
