import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import './style.css';

const app = createApp(App);

function registerPlugins(app: ReturnType<typeof createApp>) {
    app.use(router);
    app.use(store, key);
}

registerPlugins(app);

app.mount('#app');
