import axios, {AxiosInstance} from "axios";

export class SWapiService {

  private readonly axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: process.env.SWAPI_URL,
    });
  }

  async sendGetRequest(endpoint: string): Promise<any> {
    try {
      const axiosResult = await this.axiosClient.get(endpoint);
      if(axiosResult.status != 200) return null;
      return axiosResult.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

}