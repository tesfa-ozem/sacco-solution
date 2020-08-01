<template>
  <div class="calculator-conatiner">
    <span class="title">Loan Calculator</span>

    <div class="loan-filter">
      <div class="filters">
        <span class="filter-title">Mobile Loan Calculator</span>
        <div class="loan-product-container">
          <div class="tools" v-for="loan in loanTypes" :key="loan">
            <input
              selected
              class="checkbox-tools"
              type="radio"
              :value="loan"
              :name="loan"
              :id="loan"
              @click="clear()"
              v-model="comparisonvalue"
            />
            <label class="for-checkbox-tools"  :for="loan">
              <div class="icon-container">
                <i class="las la-mobile"></i>
              </div>{{loan}}
            </label>
          </div>
          
        </div>
        <div class="filter-option">
          <div class="sliderwrap">
            <label class="labeltext">Loan Product</label>
            <ejs-dropdownlist
              id="dropdownlist"
              popupHeight="200px"
              popupWidth="150px"
              :dataSource="comparisonvalue=='mobile'?mobileLoans:loans"
              v-model="selectedProduct"
              placeholder="Select Loan Product"
            ></ejs-dropdownlist>
          </div>
        </div>
        <div class="filter-option">
          <div class="sliderwrap">
            <label class="labeltext">Loan Amount</label>
            <div class="range-slide">
              <input
                type="range"
                min="0"
                :max="loanMaximum"
                class="slider"
                id="myRange"
                v-model.number="loanAmount"
              />
              <div class="range-slide-lable">
                <span>0</span>
                <span>{{ loanMaximum }}</span>
              </div>
            </div>
          </div>
          <input
            v-model.number="loanAmount"
            type="text"
            
            class="filter-value"
            :disabled="validated == 1"
          />
        </div>
        <div class="filter-option">
          <div class="sliderwrap">
            <label class="labeltext">Period</label>
            <div class="range-slide">
                 <vue-slider
      v-model="value"
      :interval="3"
      :min="3"
      :max="12"
      :marks="true"
    ></vue-slider>
              <div class="range-slide-lable">
                
              </div>
            </div>
          </div>
          <input readonly v-model="value" type="text" class="filter-value" />
        </div>

        <!-- <label class="date-lable">Start date</label>
        <div class="date-picker">
          <ejs-datepicker
            id="datepicker"
            :placeholder="waterMarkText"
          ></ejs-datepicker>
        </div>-->
        <div class="buttons">
          <button>Clear All</button>
          <button @click="calculateLoan()">Calculate</button>
        </div>
      </div>
      <div class="summary">
        <Chart :chartData="chartData" />
        <div>
          <div class="summary-field">
            <span>Principal</span>
            <span>KSE {{ formatPrice(loanAmount) }}</span>
          </div>
          <div class="summary-field">
            <span>Interest</span>
            <span>KSH {{ formatPrice(interest) }}</span>
          </div>
          <div class="summary-field">
            <span>Charges</span>
            <span>KSH {{ formatPrice(otherCharges) }}</span>
          </div>
          <div class="summary-field">
            <span>Monthly Repayments</span>
            <span>KSH {{ formatPrice(monthlyRepayment) }}</span>
          </div>
          <div class="summary-field">
            <span>Total</span>
            <span>KSE {{ formatPrice(total) }}</span>
          </div>
          <button @click="applyLoan()">Apply</button>
        </div>
      </div>
    </div>
    <loading :exampleProperty="isLoading" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Pusher from "pusher-js";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
/* import mobileIcon  from "@/assets/svg/online-payment.svg" */
import Chart from "@/components/Chart.vue";
import _ from "lodash";
interface LabeledValue {
  x: string;
  y: string;
  text: string;
}
interface ChartModal {
  array: LabeledValue;
}
type ComplexObjectInterface<LabeledValue> = [];
/* var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }); */
@Component({
  components: {
    Chart,
     VueSlider
  }
})
export default class Calculator extends Vue {
  comparisonvalue = "mobile";
  /* loanAmount = 100000;  */
  interest = 0;
  period = "36";
  waterMarkText = "Select a Range";
  picked = "mobile";
  loanValue: any = 0;
  val: any;
  loanMaximum = "";
  loanPicked: any = {};
  otherCharges = 0;
  total = 0;
  selectedProduct = "";
  productId = "";
  monthlyRepayment = "";
  isLoading = false;
  chartData: any[] = [];
  validated = 0;
  loanTypes = ['mobile','term']
  value = 3
  get loans() {
    const data = JSON.parse(this.$store.state.user.data.loan_calculator).filter(
      (loan: any) => loan.loan_category == "term"
    );
    return data.map((a: any) => a.loan_product_name);
  }
  clear(){
      
      this.interest =0
      this.loanAmount = ""
      this.total = 0
      this.otherCharges = 0
      this.monthlyRepayment =""
  }
  calculateLoan() {
    this.chartData = [];
    const data = {
      "loan_product_type": this.productId,
      "loan_category": this.comparisonvalue,
      "requested_amount": this.loanAmount,
      "installments":this.value
    };

    this.$store
      .dispatch("calculateLoan", data)
      .then(resp => {
        this.interest = resp.data[0].interest;
        this.otherCharges = resp.data[0].charges;
        this.monthlyRepayment = resp.data[0].monthly_repayment;
        this.total = resp.data[0].total;

        _.each(resp.data[0], (value: any, key: any) => {
          if (key == "principal" || key == "interest" || key == "charges") {
            this.chartData.push({ x: key, y: Math.round(value), text: key });
          }
        });
        console.log(this.chartData);
      })
      .catch(err => {
        console.log(err);
      });
  }
  get mobileLoans() {
    const data = JSON.parse(this.$store.state.user.data.loan_calculator).filter(
      (loan: any) => loan.loan_category == "mobile"
    );
    return data.map((a: any) => a.loan_product_name);
  }
  formatPrice(value: any) {
    this.val = (value / 1).toFixed(2).replace(",", ".");
    return this.val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  public get loanAmount(): string {
    return this.loanValue;
  }

  public set loanAmount(v: string) {
    this.loanValue = v;
  }

  applyLoan() {
    this.isLoading = true;
    const args = {
      "loan_product": this.productId,
      "loan_category": this.comparisonvalue,
      "requested_amount": this.loanAmount
    };
    this.$store
      .dispatch("applyLoan", args)
      .then(resp => {
        this.isLoading = false;
        console.log(resp);

        this.$notify({
          group: "foo",
          title: "Important message",
          text: resp.data[0].description,
          type: "warn",
          duration: 10000
        });
        this.$store.dispatch("getLedger");
        this.$store.dispatch("fetchUser");
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
      });
  }
  @Watch("selectedProduct")
  myFunction() {
      this.interest =0
      this.loanAmount = ""
      this.total = 0
      this.otherCharges = 0
      this.monthlyRepayment =""
    console.log("clicked");
    const loan = JSON.parse(this.$store.state.user.data.loan_calculator).filter(
      (loan: any) => loan.loan_product_name == this.selectedProduct
    );
    this.loanMaximum = loan[0]?.amount;
    this.productId = loan[0]?.loan_product_id;
  }
  @Watch("loanAmount")
  AmountWatch() {
    try{
        if (this.loanAmount > this.loanMaximum || this.loanAmount.includes("-")) {
      this.validated = 1;
    } else {
      this.validated = 0;
    }
    }catch(err){
        console.log(err)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../node_modules/@syncfusion/ej2-base/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-lists/styles/fabric.css";
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/fabric.css"; 
$primaryColor: #2f46a7;
$accentColor: #54cadc;
$textColor: #314172;
.calculator-conatiner {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  overflow-x: hidden;
  padding-left: 32px;
  padding-right: 32px;
}
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600");

/* VARS */
$open-sans: "Open Sans", "Helvetica", sans-serif;

$darkNavy: #213140;
$teal1: #66b3fb;
$teal2: #4b9dea;
$charcoal: #555555;
$gold: #b6985a;
$borderColor: rgba(168, 168, 219, 0.123);
$activeShadow: 0 0 10px rgba($teal1, 0.5);

/* MIXINS */
@mixin focusOutline {
  outline: dotted 1px #ccc;
  outline-offset: 0.45rem;
}
@mixin hideInput {
  width: 0;
  height: 0;
  position: absolute;
  left: -9999px;
}
@mixin breakpoint($point) {
  @if $point == 1100 {
    @media (max-width: 1100px) {
      @content;
    }
  } @else if $point == 800 {
    @media (max-width: 800px) {
      @content;
    }
  }
}

/* STYLE THE HTML ELEMENTS (INCLUDES RESETS FOR THE DEFAULT FIELDSET AND LEGEND STYLES) */

/* TOGGLE STYLING */
.toggle {
  margin: 0 0 1.5rem;
  box-sizing: border-box;
  font-size: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  input {
    @include hideInput;
  }
  input + label {
    margin: 0;
    padding: 0.75rem 2rem;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    border: solid 1px #ddd;
    background-color: #fff;
    font-size: 1rem;
    line-height: 140%;
    font-weight: 600;
    text-align: center;
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
    transition: border-color 0.15s ease-out, color 0.25s ease-out,
      background-color 0.15s ease-out, box-shadow 0.15s ease-out;

    /* ADD THESE PROPERTIES TO SWITCH FROM AUTO WIDTH TO FULL WIDTH */
    /*flex: 0 0 50%; display: flex; justify-content: center; align-items: center;*/
    /* ----- */

    &:first-of-type {
      border-radius: 6px 0 0 6px;
      border-right: none;
    }
    &:last-of-type {
      border-radius: 0 6px 6px 0;
      border-left: none;
    }
  }
  input:hover + label {
    border-color: $darkNavy;
  }
  input:checked + label {
    background-color: $teal2;
    color: #fff;
    box-shadow: $activeShadow;
    border-color: $teal2;
  }
  input:focus + label {
    @include focusOutline;
  }

  @include breakpoint(800) {
    input + label {
      padding: 0.75rem 0.25rem;
      flex: 0 0 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

/* STYLING FOR THE STATUS HELPER TEXT FOR THE DEMO */
.status {
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  span {
    font-weight: 600;
    color: $gold;
    &:first-of-type {
      display: inline;
    }
    &:last-of-type {
      display: none;
    }
  }
  @include breakpoint(800) {
    span {
      &:first-of-type {
        display: none;
      }
      &:last-of-type {
        display: inline;
      }
    }
  }
}
.title {
  color: $textColor;
  font-size: 36px;
  margin-top: 50px;
  font-weight: bold;
  margin-bottom: 50px;
}

// Loans
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked),
[type="radio"]:checked,
[type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
  width: 0;
  height: 0;
  visibility: hidden;
}

.tools {
  margin-right: 16px;
}
.checkbox-tools:checked + label,
.checkbox-tools:not(:checked) + label {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  z-index: -0;
  width: 100px;
  height: 15px;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 1px;
  margin: 0 auto;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 0px;
  overflow: hidden;
  cursor: pointer;
  text-transform: uppercase;
  color: $primaryColor;
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
}
.checkbox-tools:not(:checked) + label {
  background: $borderColor;
  border: $borderColor solid 2px;
}
.checkbox-tools:checked + label {
  background: $borderColor;
  border: $primaryColor solid 2px;
}

//
.loan-product-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
}
//loan filter
.summary {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  margin-left: 20px;
  button {
    margin-top: 50px;
    background: $textColor;
    color: white;
    border: none;
    height: 55px;
    width: 150px;
  }
  span:last-child {
    margin-top: 20px;
    font-size: 12px;
    color: $textColor;
  }
}
.filters {
  width: 40%;
  padding: 50px;
}
.summary {
  width: 60%;
  width: 60%;
  padding: 50px;
  background-color: rgb(238, 238, 238);
}

.loan-filter {
  height: 600px;
  width: 100%;
  background-color: white;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;

  .summary-field {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 80%;
    color: $textColor;
    margin-top: 20px;

    span:nth-child(2) {
      font-size: 16px;
      font-weight: bold;
      text-align: end;
    }
    span:nth-child(1) {
      font-size: 18px;
      text-align: start;
    }
  }

  .range-slide {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
.filters {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .filter-title {
    color: $textColor;
    font-size: 22px;
    font-weight: bold;
  }

  .slider-default .sliderwrap label {
    padding-bottom: 26px;
    font-size: 14px;

    font-weight: 500;
    margin-top: 15px;
    color: $textColor;
  }
  .sliderwrap {
    margin-top: 20px;
    display: flex;
    width: 50%;
    color: $textColor;
    justify-content: space-between;
    height: 70px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    align-content: flex-start;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background: $textColor;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 20%;
    background: $textColor;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 20%;
    background: $textColor;
    cursor: pointer;
  }
}
.filter-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  .filter-value {
    margin-top: 20px;
    margin-left: 50px;
    width: 100px;
    height: 25px;
    text-align: center;
    font-size: 18px;
    color: $textColor;
    border: $textColor solid 1px;
  }
}

.range-slide-lable {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px !important;
}
.date-picker {
  margin-top: 20px;
  height: 40px;
  width: 200px;
}
.date-lable {
  color: $textColor;
  padding-top: 10px;
}
button {
  height: 40px;
  width: 120px;
  margin-left: 20px;
}
.buttons {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
}
button:nth-child(1) {
  background: white;
  border: $textColor solid 1px;
  color: $textColor;
}
button:nth-child(2) {
  background: $textColor;
  color: white;
  border: none;
}
.icon-container {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
@media only screen and (max-width: 600px) {
  .loan-filter {
    display: flex;
    flex-direction: column;
    height: 500px;
  }
  .loan-product-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    overflow: auto;
    margin-right: 20px;
    width: 100%;
  }
  .calculator-conatiner {
    padding-left: 16px;
    padding-right: 16px;
  }
  .summary {
    background-color: transparent;
    margin-top: 0px;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
  }
  .filters {
    width: 100%;
    padding-bottom: 0;
    padding-left: 8px;
    padding-right: 8px;
    align-items: flex-start;
  }
  .filter-option {
    justify-content: flex-start;
    align-items: flex-start;
  }
  .buttons {
    justify-content: center;
  }
  .toggle {
    justify-content: center;
  }
  [type="checkbox"]:checked,
  [type="checkbox"]:not(:checked),
  [type="radio"]:checked,
  [type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
    width: 0;
    height: 0;
    visibility: hidden;
  }
  .checkbox-tools:checked + label,
  .checkbox-tools:not(:checked) + label {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px;
    z-index: -0;
    width: 100px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    margin: 0 auto;
    margin-bottom: 10px;
    text-align: center;
    border-radius: 0px;
    overflow: hidden;
    cursor: pointer;
    text-transform: uppercase;
    color: $primaryColor;
    -webkit-transition: all 300ms linear;
    transition: all 300ms linear;
  }
}
/* Loading animation */
</style>
