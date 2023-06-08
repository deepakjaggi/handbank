import { useState } from "react";

interface RequestError {
  status: number;
  message: string;
}

interface RequestState<T> {
  isLoading: boolean;
  error: RequestError | null;
  data: T | null;
}

function useHttpGetRequest<T>(endpoint: string) {
  const [requestState, setRequestState] = useState<RequestState<T>>({
    isLoading: false,
    error: null,
    data: null,
  });

  async function executeRequest(
    parameters?: Record<string, any>
  ): Promise<Pick<RequestState<T>, "data" | "error">> {
    const requestEndpoint = replaceEndpointParameters(endpoint, parameters);

    if (!requestState.isLoading) {
      setRequestState({ isLoading: true, error: null, data: null });
    }

    let data: T | null, error: RequestError | null;

    try {
      const response = await fetch(requestEndpoint);

      const parsedResponse = await response.json();

      if (!response.ok) {
        error = { status: response.status, message: response.statusText };
        data = null;
      } else {
        error = null;
        data = parsedResponse;
      }
    } catch (e) {
      error = { status: 400, message: "Request failed" };
      data = null;
    }

    setRequestState({
      isLoading: false,
      error,
      data,
    });

    return { data, error };
  }

  return {
    isLoading: requestState.isLoading,
    error: requestState.error,
    data: requestState.data,
    executeRequest,
  };
}

export default useHttpGetRequest;

function replaceEndpointParameters(
  url: string,
  urlParameters: Record<string, any> | undefined
) {
  if (!urlParameters) return url;

  const urlParamKeys = Object.keys(urlParameters);
  let finalUrl = url;

  urlParamKeys.forEach((key) => {
    const urlPlaceholder = `:${key}`;
    finalUrl = finalUrl.replace(urlPlaceholder, urlParameters[key]);
  });

  return finalUrl;
}
