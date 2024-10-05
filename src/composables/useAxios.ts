import axios from 'axios';
import { AxiosError } from 'axios';
import { exceptionHelper } from '@/services/ExceptionHelper';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface UseAxiosOptions<TData> {
  url: string;
  method: HttpMethod;
  data?: TData;
  signal?: AbortSignal;
  defaultErrorMessage: string;
  additionalInternalMessage?: string;
  params?: URLSearchParams;
}

export async function useAxios<TResponse, TData = void>(
  options: UseAxiosOptions<TData>
) {
  try {
    const result = await axios<TResponse>(options.url, {
      method: options.method,
      data: options.data,
      signal: options.signal,
      params: options.params,
    });
    return result;
  } catch (err) {
    const error = err as AxiosError;
    exceptionHelper().showExceptionMessage(
      error,
      options.defaultErrorMessage,
      options.additionalInternalMessage
    );
  }
  return null;
}
