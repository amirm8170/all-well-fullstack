import Axios, { Method, AxiosPromise, AxiosResponse } from "axios";
import config from "./config";
import Cookies from "js-cookie";

class Api {
  private _token: string | undefined;
  private static instance: any;
  private axiosInstance: any;
  set token(token: string) {
    this._token = token;
  }
  private constructor() {
    this.axiosInstance = Axios.create({
      baseURL: process.env.REACT_APP_DEVELOP_BASE_API,
      headers: config.headers,
    });
  }

  static getInstance = (): Api => {
    if (!Api.instance && !(Api.instance instanceof Api)) {
      Api.instance = new Api();
    }
    return Api.instance;
  };

  buildHeaders = (options: any): object => {
    const headers = {
      Authorization: `${config.tokenType} ${
        this._token || Cookies.get("accessToken") || ""
      }`,
      ...options?.headers,
    };
    return headers;
  };

  axios = (
    method: Method,
    url: string,
    data?: object,
    options?: any
  ): AxiosPromise => {
    return this.axiosInstance({
      method,
      url,
      headers: this.buildHeaders(options),
      ...(method === "GET" || method === "DELETE"
        ? { params: data }
        : { data }),
    });
  };

  get = async (
    path: string,
    params?: object,
    options = {}
  ): Promise<AxiosResponse> => {
    return await this.axios("GET", path, params, options);
  };
  post = async (
    path: string,
    body?: object,
    options = {}
  ): Promise<AxiosResponse> => {
    return await this.axios("POST", path, body, options);
  };
  put = async (
    path: string,
    body: object,
    options = {}
  ): Promise<AxiosResponse> => {
    return await this.axios("PUT", path, body, options);
  };
  delete = async (
    path: string,
    params?: object,
    options = {}
  ): Promise<AxiosResponse> => {
    return await this.axios("DELETE", path, params, options);
  };
}

export default Api.getInstance();
