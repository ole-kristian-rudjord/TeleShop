import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@fortawesome/fontawesome-free/css/all.css';
import { fa } from 'vuetify/iconsets/fa';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    icons: {
      defaultSet: 'fa',
      sets: {
        fa,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
