import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import {AylienArticle} from "@/types/AylienArticle";

export default class AylienService {
    private static apiUrl = "https://api.aylien.com/api/v1/extract";

    static async extractText(html: string) : Promise<AylienArticle> {
        const params = new URLSearchParams();
        params.append('html', html);
        params.append('best_image', 'false');
        params.append('language', 'en');


        const res = await fetch(AylienService.apiUrl, {
            headers: {
                'X-AYLIEN-TextAPI-Application-Key': process.env.AYLIEN_APP_KEY,
                'X-AYLIEN-TextAPI-Application-ID': process.env.AYLIEN_APP_ID
            },
            method: 'POST',
            body: params
        });
        return (await res.json()) as AylienArticle;
    }
}