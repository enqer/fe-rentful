import { createApp } from 'vue';
import App from './App.vue';
import { Quasar } from 'quasar';
import pl from 'quasar/lang/pl';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
import router from './router';
import 'virtual:uno.css';

const myApp = createApp(App);

myApp.use(Quasar, {
  lang: pl,
});

myApp.use(router);
myApp.mount('#app');
