<template>
  <div class="main-container">
     <span class="title">Payments</span>
      <div class="container">
        <div
          v-for="tab in tabs"
          v-bind:key="tab"
          v-bind:class="['tab-button', { active: currentTab === tab }]"
          v-on:click="currentTab = tab"
        >
          {{ tab }}
        </div>
       
      </div>
       <div class="component-container">
           <component v-bind:is="currentTabComponent" class="tab"></component>
       </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Payments from "@/components/Payments.vue"
import Loan from "@/components/Loan.vue"
@Component({
  components: {
      'tab-deposits':Payments,
     'tab-loan': Loan
  },
})
export default class Services extends Vue {
  currentTab = "Deposits";
  tabs = ["Deposits", "Loan"];
  get currentTabComponent(){
            return "tab-" + this.currentTab.toLowerCase();
          }
}
</script>

<style lang="scss" scoped>
$darkNavy: #213140;
$teal1: #66b3fb;
$teal2: #4b9dea;
$charcoal: #555555;
$gold: #b6985a;
$borderColor: rgba(168, 168, 219, 0.123);
$activeShadow: 0 0 10px rgba($teal1, 0.5);
$primaryColor: #2f46a7;
$accentColor: #54cadc;
$textColor: #314172;
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  overflow-x: hidden;
  padding: 32px;
  width: 100%;
}
.title {
  color: $textColor;
  font-size: 36px;
  margin-top: 50px;
  font-weight: bold;
  margin-bottom: 50px;
}
.tab-button{
    cursor: default;
    width: 100%;
   
    -webkit-transition: all 300ms linear;
    transition: all 300ms ease;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.active {
  background: #e7eaec;
  
  color: $textColor;
}
.container {
  background: white;
  display: flex;
  flex-direction: row;
  width: 60%;
}
.component-container{
    height: 400px;
    width: 60%;
    background-color: white;
    
}

</style>
