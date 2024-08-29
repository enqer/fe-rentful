import { createApp } from 'vue';
import App from './App.vue';
import { Quasar } from 'quasar';
import pl from 'quasar/lang/pl';
import '@quasar/extras/material-icons/material-icons.css';
// import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import 'quasar/src/css/index.sass';
import './quasar-variables.sass';
import router from './router';
import 'virtual:uno.css';
import './../tailwind.css';
import './../tailwind.css';

const myApp = createApp(App);

myApp.use(Quasar, {
  lang: pl,
  config: {
    brand: {
      primary: '#18181b',
    },
  },
});

myApp.use(router);
myApp.mount('#app');
