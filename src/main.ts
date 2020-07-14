import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import component and stylesheet
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import VueProgressBar from "vue-progressbar";
import "./registerServiceWorker";
import { ReactiveFormConfig, ClientLibrary } from '@rxweb/reactive-forms';

ReactiveFormConfig.clientLib = ClientLibrary.Vue;

ReactiveFormConfig.set({
    validationMessage: {
        required: "This Field is required",
        
    }
});

Vue.use(VueProgressBar, {
  color: "rgb(143, 255, 199)",
  failedColor: "red",
  height: "2px"
});
Sentry.init({
  dsn:
    "https://a30e0cd87eb14e38a4f5e6e7f23742ff@o415332.ingest.sentry.io/5306262",
  integrations: [
    new VueIntegration({ Vue, attachProps: true, logErrors: true })
  ]
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
