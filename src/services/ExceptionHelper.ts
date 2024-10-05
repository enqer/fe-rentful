import type { ExceptionMessage } from '@/types/models/index';
import { AxiosError } from 'axios';
import { Notify } from 'quasar';

export function exceptionHelper() {
  function showExceptionMessage(
    error: AxiosError,
    message: string,
    additionalInternalMessage?: string
  ) {
    if (!error.response) {
      return;
    }
    if (isExceptionMessage(error.response?.data)) {
      const internalMessage = additionalInternalMessage
        ? additionalInternalMessage
        : '';
      Notify.create({
        message: error.response?.data.title,
        caption: `${error.response?.data.description} ${internalMessage}`,
        icon: 'warning',
        color: 'warning',
        textColor: 'black',
        timeout: 0,
        position: 'top-right',
        actions: [{ icon: 'close', color: 'black' }],
      });
      return;
    }
    Notify.create({
      message: `Błąd ${error.response?.status}`,
      caption: message,
      icon: 'priority_high',
      color: 'deep-orange-8',
      textColor: 'white',
      timeout: 3000,
      position: 'top-right',
      actions: [{ icon: 'close', color: 'white' }],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isExceptionMessage(obj: any): obj is ExceptionMessage {
    return typeof obj.description === 'string' && typeof obj.title === 'string';
  }

  return {
    showExceptionMessage,
  };
}
