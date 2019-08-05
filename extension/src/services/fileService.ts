import * as uuid from "uuid/v4";

import AuthService from "@/services/authService";
import { APIResponse } from "@/types";

class ArticleService {
  baseUrl = process.env.VUE_APP_API_URL;

  async fileArticle(source: string, url: string): Promise<void> {
    const id = uuid();

    const request = await fetch(`${this.baseUrl}/files/create/${id}`, {
      method: "POST",
      body: JSON.stringify({
        url,
        html: Buffer.from(source).toJSON().data
      }),
      headers: {
        Authorization: `Bearer: ${AuthService.accessToken}`
      }
    });

    const response = await request.json();

    chrome.downloads.download({
      url: `${this.baseUrl}/files/get/${response.result.id}`,
      headers: [
        {
          name: "Authorization",
          value: `Bearer ${AuthService.accessToken}`
        }
      ],
      method: "GET",
      filename: response.result.filename,
      saveAs: true
    });
  }
}

export default new ArticleService();
