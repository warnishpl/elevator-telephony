import axios, { AxiosRequestConfig } from "axios";
import { enqueueAlert } from "@/context/AlertProvider";

interface RequestApiProps {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: object;
  params?: object;
  headers?: object;
  onError?: () => void;
}

export async function requestApi<T = unknown>({
  path,
  method,
  data,
  params,
  onError,
  headers,
}: RequestApiProps): Promise<{ data: T }> {
  const config: AxiosRequestConfig = {
    method,
    url: path,
    data,
    baseURL: "http://eletele.tplinkdns.com/api",
    params,
    timeout: 5000,
    withCredentials: true,
    headers,
  };

  return axios(config)
    .then((response) => {
      enqueueAlert("API SUCCESS", "success");
      return { data: response.data };
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.message || "Nieznany błąd";
        enqueueAlert(errorMessage, "error");
      } else {
        enqueueAlert("Wystąpił nieoczekiwany błąd", "error");
      }
      if (onError) {
        onError();
      }
      return {
        status: error.response?.status || 500,
        data: error.response?.data || {},
      };
    });
}
