import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import component and stylesheet
import Loading from "@/components/Loading.vue"
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import VueProgressBar from "vue-progressbar";
import "./registerServiceWorker";
import { ReactiveFormConfig, ClientLibrary } from '@rxweb/reactive-forms';
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import Notifications from 'vue-notification'
Vue.use(Notifications)
Vue.use(DropDownListPlugin);
Vue.use(DatePickerPlugin);
Vue.component('loading',Loading)
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
  /* beforeSend(event, hint) {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  } */
});

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
  router,
  store,
  components: { App },
  
}).$mount("#app");
