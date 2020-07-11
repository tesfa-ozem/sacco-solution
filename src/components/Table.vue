<template>
  <div>
    <ejs-grid
      :dataSource="ledger"
      :allowPaging="true"
      :pageSettings="pageSettings"
      :toolbar="toolbarOptions"
      height="272px"
    >
      <e-columns>
        <e-column
          field="transaction_no"
          headerText="Transaction Number"
          textAlign="Center"
        ></e-column>

        <e-column
          field="transaction_type"
          headerText="Transaction"
          textAlign="Center"
        ></e-column>
        <e-column
          field="transaction_name"
          headerText="Description"
          textAlign="Center"
        ></e-column>
        <e-column field="date" headerText="Date" textAlign="Center"></e-column>
        <e-column
          field="amount"
          headerText="Amount"
          textAlign="Center"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { GridPlugin, Page, Toolbar, Search } from "@syncfusion/ej2-vue-grids";

Vue.use(GridPlugin);

export default Vue.extend({
  data: () => {
    return {
      pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
      toolbarOptions: ["Search"],
      cTemplate: function() {
        return {
          template: Vue.component("columnTemplate", {
            template: `<div >
                    {{cData}}
                </div>
                `,
            data: function() {
              return {
                data: {}
              };
            },
            computed: {
              cData: function() {
                return this.data.amount;
              }
            }
          })
        };
      }
    };
  },
  computed: {
    ledger() {
      return this.$store.state.ledger.data;
    }
  },
  provide: {
    grid: [Page, Search]
  }
});
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
</style>
