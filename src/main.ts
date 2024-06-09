import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import './style.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHorse } from '@fortawesome/free-solid-svg-icons'

library.add(faHorse)
const app = createApp(App);

function registerPlugins(app: ReturnType<typeof createApp>) {
    app.use(router);
    app.use(store, key);
    app.component('font-awesome-icon', FontAwesomeIcon)
}

registerPlugins(app);

app.mount('#app');
