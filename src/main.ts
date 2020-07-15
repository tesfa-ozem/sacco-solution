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
import "carbon-components/css/carbon-components.css";
import CarbonComponentsVue from "@carbon/vue/src/index";
Vue.use(CarbonComponentsVue);
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
  ],
  beforeSend(event, hint) {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  }
});

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
  router,
  store,
  components: { App },
  
}).$mount("#app");
