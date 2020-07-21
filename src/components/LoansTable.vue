<template>
  <div>
  
    <ejs-grid
      :dataSource="loanData"
      :allowPaging="true"
      :pageSettings="pageSettings"
      :toolbar='toolbar'
      :allowFiltering='true' 
      :filterSettings='filterSettings'
      height="272px"
    >
      <e-columns>
        <e-column field="name" headerText="Loan Number" textAlign="Left"></e-column>

        <e-column
          field="transaction_name"
          headerText="Description"
          :template="cTemplate"
          textAlign="Left"
        ></e-column>
        <e-column field="application_date" headerText="Date" textAlign="Left"></e-column>
        <e-column field="state" headerText="Status" textAlign="Left"></e-column>
        <e-column
          field="requested_amount"
          headerText="Amount"
          :template="aTemplate"
          textAlign="Left"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  Page,
  Toolbar,
  Filter,
  Search,
  GridComponent,
   FilterType,
} from "@syncfusion/ej2-vue-grids";
import ProjectMixin from "@/mixins/ProjectMixin";
import {
  DropDownListPlugin,
  ChangeEventArgs
} from "@syncfusion/ej2-vue-dropdowns";
Vue.use(DropDownListPlugin);
export default Vue.extend({
  name: "LoanTable",
  data: () => {
    return {
      pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
      toolbarOptions: ["Search"],
      toolbar: ["Search"],
      cTemplate: function() {
        return {
          template: Vue.component("cTemplate", {
            template: "<div>{{data.loan_product_type[1]}}</div>",
            data: function() {
              return { data: {} };
            }
          })
        };
      },
      aTemplate: function() {
        return {
          template: Vue.component("cTemplate", {
            template: "<div>KSH {{formatPrice(data.requested_amount)}}</div>",
            data: function() {
              return { data: {} };
            },
            mixins: [ProjectMixin]
          })
        };
      },
       ddldata: ['All','appraisal'],
       filterSettings: { type: 'Menu' },
    };
  },
  methods:{
      push(){
          console.log("hello")
      },
      
    
  },
  mixins: [ProjectMixin],
  computed: {
    loanData() {
      return this.$store.state.outStandingLoans.data;
    }
  },
  provide: {
    grid: [Page, Search, Filter]
  }
});
</script>

<style lang='scss' scoped>
@import "../../node_modules/@syncfusion/ej2-base/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-calendars/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-dropdowns/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-vue-grids/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-vue-grids/styles/fabric.css";
.select-wrap {
    padding: 0 0 10px 0;
    font-family: Roboto;
    padding: 1em;
}

.select-wrap select {
    height: 28px;
    width: 100%;
    border-width: 0 0 2px 0;
    background: transparent;
}

.select-wrap select:focus {
    border-bottom-style: solid;
    border-color: #ff4081;
}

.select-wrap select, 
.select-wrap select option {
    outline: none;
    font-size: 14px;
    padding: .2em;
    height: 30px;
}

@media (min-width: 480px) and (max-width:639px) {
    .select-wrap {
        width: 40%
    }
}

@media (min-width:640px) {
    .select-wrap {
        width: 25%
    }
}
</style>