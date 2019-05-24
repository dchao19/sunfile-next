import AuthService from "@/services/authService";
import { APIResponse, ArticleMetadata, FileParagraphs, TemplatedArticle, ExtractedArticle } from "@/types";
import uuid from "uuid/v4";

class FilingService {
    baseUrl = process.env.VUE_APP_API_URL;

    async extractArticle(url: string) {
        const encodedUrl = encodeURIComponent(url);
        const req = await fetch(`${this.baseUrl}/files/extract?url=${encodedUrl}`, {
            headers: {
                'Authorization': `Bearer ${await AuthService.accessToken()}`
            }
        });

        if (req.status !== 200) {
            throw "An error occured extracting the article!"
        }

        const res = (await req.json()) as APIResponse<ExtractedArticle>;
        return res.result;
    }

    async templateArticle(paragraphs: FileParagraphs, metadata: ArticleMetadata) {
        console.log(uuid());

        const req = await fetch(`${this.baseUrl}/files/template`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${await AuthService.accessToken()}`
            },
            body: JSON.stringify({
                paragraphs,
                metadata,
                url: metadata.url,
                id: uuid()
            })
        });

        if (req.status !== 200) {
            throw "An error occurred templating the article!"
        }

        const res = (await req.json()) as APIResponse<TemplatedArticle>;
        return res.result;
    }

    getArticleDownloadUrl(id: string) {
        return `${this.baseUrl}/files/get/${id}`;
    }
}

export default new FilingService();