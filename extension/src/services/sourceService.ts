import AuthService from "@/services/authService";
import { APIResponse, Source } from "@/types";

class SourceService {
  baseUrl = process.env.VUE_APP_API_URL;

  async getAllSources(): Promise<Source[]> {
    const request = await fetch(`${this.baseUrl}/sources`, {
      headers: {
        Authorization: `Bearer ${AuthService.accessToken}`
      }
    });

    if (request.status !== 200) {
      throw new Error("An error occurred fetching the sources!");
    }

    const response = (await request.json()) as APIResponse<Source[]>;
    return response.result;
  }

  async createSource(
    name: string,
    code: string,
    rootUrl: string
  ): Promise<Source> {
    const request = await fetch(`${this.baseUrl}/sources`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AuthService.accessToken}`
      },
      body: JSON.stringify({
        name,
        code,
        rootUrl
      })
    });

    if (request.status !== 201) {
      throw new Error("An error occurred creating the source!");
    }

    const response = (await request.json()) as APIResponse<Source>;
    return response.result;
  }
}

export default new SourceService();
