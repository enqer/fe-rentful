import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Quasar } from 'quasar';
import pl from 'quasar/lang/pl'
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

const myApp = createApp(App);

myApp.use(Quasar, {
    lang: pl,
  });

myApp.mount('#app');

