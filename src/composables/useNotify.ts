import { Notify } from 'quasar';

export function useNotify() {
  function showWarning(title: string, message: string, timeout: number = 3000) {
    Notify.create({
      message: title,
      caption: message,
      icon: 'warning',
      color: 'warning',
      textColor: 'black',
      timeout,
      position: 'top-right',
      actions: [{ icon: 'close', color: 'black' }],
    });
  }

  function showSuccess(title: string, message: string, timeout: number = 3000) {
    Notify.create({
      message: title,
      caption: message,
      icon: 'check_circle',
      color: 'positive',
      textColor: 'white',
      timeout: timeout,
      position: 'top-right',
      actions: [{ icon: 'close', color: 'white' }],
    });
  }

  return {
    showWarning,
    showSuccess,
  };
}
