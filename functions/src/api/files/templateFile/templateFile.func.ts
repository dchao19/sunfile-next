import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { SecuredHttpRequest } from "@/types/SecuredHttpRequest";
import { withAuth } from "@/utils/withAuth";
import { sequelize } from "@/setups/dbSetup";

import File from "@/models/File.model";
import Source from "@/models/Source.model";
import User from "@/models/User.model";

import * as moment from "moment";
import * as docxtemplater from "docxtemplater";
import * as JSZip from "jszip";
import * as fs from "fs";
import * as uuid from "uuid/v4";
import { transliterate as tr } from "transliteration";
import { decode } from "iconv-lite";

const template = new JSZip(
    fs.readFileSync(require("./templateWithHighlight.docx"), "binary")
);
const templater = new docxtemplater();
templater.loadZip(template);

const run = async (context: Context, req: SecuredHttpRequest) => {
    const metadata = req.body.metadata;
    const url = req.body.url;
    const id = req.body.id;
    const paragraphs = req.body.paragraphs;

    console.log(id);

    try {
        const newFile = new File(
            {
                published: new Date(metadata.date_published),
                url,
                title: metadata.title,
                id: uuid()
            },
            {
                include: [Source, User]
            }
        );

        let source = await Source.findOne({
            where: sequelize.where(
                sequelize.fn(
                    "CHARINDEX",
                    sequelize.col("rootUrl"),
                    newFile.url
                ),
                ">",
                0
            )
        });

        if (!source) {
            source = new Source({
                code: url,
                rootUrl: url,
                name: "URL"
            });
        }

        const contextData = {
            paragraphs,
            formattedDate: newFile.published.toLocaleDateString(),
            sourceName: source.name,
            title: tr(decode(Buffer.from(newFile.title), "utf8"))
        };

        templater.setData(contextData);
        templater.render();

        newFile.$set("source", source);
        newFile.$set("user", req.user);

        context.bindings.output = templater.getZip().generate({
            type: "nodebuffer",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });

        await newFile.save();

        const shortDate = moment(newFile.published).format("YYMMDD");
        const filename = `${shortDate} ${source.code} - ${newFile.title}.docx`;

        context.res = {
            status: HttpStatusCode.OK,
            body: {
                success: true,
                result: {
                    id,
                    filename
                },
                message: "Article saved."
            }
        };
    } catch (e) {}
};

export default withAuth(run);
