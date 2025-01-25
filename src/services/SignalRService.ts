import { useUser } from '@/composables/useUser';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ref } from 'vue';
import { auth } from './LocalStorageService';
import type { Notify, NotifyExtended } from '@/types/models/User';

const user = useUser();

const signalR = ref<HubConnection | null>(null)
export const notifications = ref<NotifyExtended[]>([])

export function initSignalR() {
  if (!user.isLogged()) {
    return;
  }
  signalR.value = new HubConnectionBuilder()
    .withUrl('https://localhost:7191/notificationHub', {
      accessTokenFactory: () => auth.value.accessToken || ''
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();
  signalR.value.on('user-notifications', (notification: Notify) => {
    notifications.value = [{ isWatched: false, ...notification }, ...notifications.value];
  });
  signalR
    .value
    .start()
    .then(() => console.log('Connected to SignalR hub'))
    .catch((err) => {
      console.error('SignalR connection error:', err);
    });
}
