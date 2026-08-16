import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { defer, map, type Observable } from 'rxjs';

class ApiClient {
  static #instance: ApiClient | undefined;
  readonly #axiosInstance: AxiosInstance;

  private constructor() {
    this.#axiosInstance = axios.create({
      baseURL: process.env.BASE_URL,
    });

    this.#setupInterceptors();
  }

  static getInstance() {
    if (!ApiClient.#instance) ApiClient.#instance = new ApiClient();

    return ApiClient.#instance;
  }

  #setupInterceptors() {
    this.#axiosInstance.interceptors.request.use(
      this.#handleRequest.bind(this),
      this.#handleRequestError.bind(this),
    );

    this.#axiosInstance.interceptors.response.use(
      this.#handleResponse.bind(this),
      this.#handleResponseError.bind(this),
    );
  }

  #handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    return config;
  }

  #handleRequestError(error: AxiosError) {
    console.error(error);
  }

  #handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  #handleResponseError(error: AxiosError) {
    console.error(error);
  }

  get<T>(url: string, config: AxiosRequestConfig = {}): Observable<T> {
    return defer(() => this.#axiosInstance.get<T>(url, config)).pipe(
      map((response) => response.data),
    );
  }
}

export const apiClient = ApiClient.getInstance();
