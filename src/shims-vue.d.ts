declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "lodash";

declare module "vue-progressbar" {
    import { PluginFunction } from "vue";
  
    export const install: PluginFunction<{}>;
  
    interface ProgressMethods {
      start(): void;
      finish(): void;
      fail(): void;
    }
  
    module "vue/types/vue" {
      interface Vue {
        $Progress: ProgressMethods;
      }
    }
}

declare module "@carbon/vue/src/index"
