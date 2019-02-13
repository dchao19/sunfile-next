import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { SecuredHttpRequest } from "@/types/SecuredHttpRequest";
import { withAuth } from "@/utils/withAuth";

import AylienService from "@/services/aylienService";
import File from "@/models/File.model";
import Source from "@/models/Source.model";

import Mercury from "@postlight/mercury-parser";

import { sequelize } from "@/setups/dbSetup";
const op = sequelize.Op;

const run = async (context: Context, req: SecuredHttpRequest) => {
    const html = Buffer.from(req.body.html).toString();
    const url = req.body.url as string;

    try {
        const [metadata, { article }] = await Promise.all([
            Mercury.parse(url, { html }),
            AylienService.extractText(html)
        ]);

        const newFile = new File();
        newFile.published = new Date(metadata.date_published);
        newFile.title = metadata.title;
        newFile.url = url;

        const source = await Source.findOne({
            where: sequelize.where(
                sequelize.fn("CHARINDEX", sequelize.col("rootUrl"), newFile.url),
                ">",
                0
            )
        });

        newFile.source = source;
        newFile.user = req.user;

        await newFile.save();

        context.res = {
            status: HttpStatusCode.OK,
            body: {
                success: true,
                result: newFile,
                message: "The article's metadata was successfully extracted."
            }
        };
    } catch (e) {
        context.res = {
            status: HttpStatusCode.InternalServerError,
            body: {
                success: false,
                result: null,
                message: e
            }
        };
    }
};

export default withAuth(run);
