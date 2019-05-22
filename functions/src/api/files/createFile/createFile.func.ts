import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { SecuredHttpRequest } from "@/types/SecuredHttpRequest";
import { withAuth } from "@/utils/withAuth";

import File from "@/models/File.model";
import Source from "@/models/Source.model";
import User from "@/models/User.model";
import Team from "@/models/Team.model";

import * as Mercury from "@sunfile/parser";
import * as textConverter from "html-to-text";
import * as docxtemplater from "docxtemplater";
import * as JSZip from "jszip";
import * as fs from "fs";
import * as uuid from "uuid/v4";
import { transliterate as tr } from "transliteration";
import { decode } from "iconv-lite";

import * as moment from "moment";

import { sequelize } from "@/setups/dbSetup";

const template = new JSZip(
    fs.readFileSync(require("./template.docx"), "binary")
);
const templater = new docxtemplater();
templater.loadZip(template);

const run = async (context: Context, req: SecuredHttpRequest) => {
    const html = Buffer.from(req.body.html);
    const url = req.body.url as string;
    const id = req.params.fileId;

    try {
        const metadata = await Mercury.parse(url, {
            html,
            contentType: "html"
        });

        const decoded = tr(decode(Buffer.from(metadata.content), "utf8"));
        const text = textConverter.fromString(decoded, {
            wordwrap: false,
            ignoreHref: true,
            ignoreImage: true,
            singleNewLineParagraphs: true,
            uppercaseHeadings: false
        });

        const paragraphs = text.split("\n").map(content => {
            return { content };
        });

        const newFile = new File(
            {
                published: new Date(metadata.date_published),
                url,
                title: metadata.title,
                id
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
    } catch (e) {
        console.log(e);
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
