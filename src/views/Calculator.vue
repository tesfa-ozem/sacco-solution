<template>
  <div class="calculator-conatiner">
    <span class="title">Loan Calculator</span>
    <div class="loans-container">
      <div class="toggle">
        <input
          v-model="picked"
          type="radio"
          name="sizeBy"
          value="mobile"
          id="sizeWeight"
          checked="checked"
        />
        <label for="sizeWeight">Mobile Loan</label>
        <input
          v-model="picked"
          type="radio"
          name="sizeBy"
          value="term"
          id="sizeDimensions"
        />
        <label for="sizeDimensions">Term Loan</label>
      </div>
    </div>
    <div class="loan-product-container">
      <div
        class="tools"
        v-for="loan in picked != 'mobile' ? loans : mobileLoans"
        :key="loan.id"
        @click="getLoanDetails(loan)"
      >
        <input
          class="checkbox-tools"
          type="radio"
          :value="loan"
          :name="loan.display_name"
          :id="loan.display_name"
          v-model="comparisonvalue"
        />
        <label class="for-checkbox-tools" :for="loan.display_name">
          <i class="uil uil-line-alt"></i>
          {{ loan.display_name }}
        </label>
      </div>
    </div>
    <div class="loan-filter">
      <div class="filters">
        <span class="filter-title">Mobile Loan Calculator</span>
        <div class="filter-option">
          <div class="sliderwrap ">
            <label class="labeltext">Loan Amount</label>
            <div class="range-slide">
              <input
                type="range"
                min="1000"
                :max="loanMaximum"
                class="slider"
                id="myRange"
                v-model.number="loanAmount"
              />
              <div class="range-slide-lable">
                <span>1000</span>
                <span>{{ loanMaximum }}</span>
              </div>
            </div>
          </div>
          <input v-model.number="loanAmount" type="text" class="filter-value" />
        </div>
        <div class="filter-option">
          <div class="sliderwrap ">
            <label class="labeltext">Interest Rate</label>
            <div class="range-slide">
              <input
                type="range"
                min="14"
                max="28"
                value="50"
                class="slider"
                id="myRange"
                readonly
              />
              <div class="range-slide-lable">
                <span>12%</span>
                <span>28%</span>
              </div>
            </div>
          </div>
          <input readonly type="text" class="filter-value" v-model="interest" />
        </div>

        <label class="date-lable">Start date</label>
        <div class="date-picker">
          <ejs-datepicker
            id="datepicker"
            :placeholder="waterMarkText"
          ></ejs-datepicker>
        </div>
        <div class="buttons">
          <button>Clear All</button>
          <button @click="calculateLoan()">Calculate</button>
        </div>
      </div>
      <div class="summary">
        <div class="summary-field">
          <span>Principal</span>
          <span>KSE {{ formatPrice(loanAmount) }}</span>
        </div>
        <div class="summary-field">
          <span>Interest</span>
          <span>KSH {{ formatPrice(interest) }}</span>
        </div>
        <div class="summary-field">
          <div><span style="color:red">*</span><span>Charges</span></div>
          <span>KSH {{ formatPrice(otherCharges) }}</span>
        </div>
        <div class="summary-field">
          <span>Total</span>
          <span>KSE {{ formatPrice(total) }}</span>
        </div>

        <button>Apply</button>
        <span>This includes sevice charges and processing fees.</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import _ from "lodash";
Vue.use(DatePickerPlugin);
/* var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }); */
@Component
export default class Calculator extends Vue {
  comparisonvalue: any = {};
  /* loanAmount = 100000;  */
  interest = 0;
  period = "36";
  waterMarkText = "Select a Range";
  picked = "mobile";
  loanValue: any = 1000;
  val: any;
  loanMaximum = "";
  loanPicked: any = {};
  otherCharges = 0;
  total = 0;

  get loans() {
    return this.$store.state.loanCategories.data.data.filter(
      (loan: any) => loan.loan_category == "term"
    );
  }
  getLoanDetails(loan: any) {
    this.otherCharges = 0;
    this.interest = 0;
    this.total = 0;
    this.loanValue = 1000;
    this.loanMaximum =
      loan.max_loan_amount == 0 ? "10000" : loan.max_loan_amount;
  }
  calculateLoan() {
    const data = {
      "loan_product_type": this.comparisonvalue.id,
      "loan_category": this.picked,
      "requested_amount": this.loanAmount
    };

    this.$store
      .dispatch("calculateLoan", data)
      .then(resp => {
        this.interest = resp.data[0].interest;
        this.otherCharges = resp.data[0].charges;
        _.forEach(resp.data[0], (value: any, key: any) => {
          this.total += value;
          console.log(this.total);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  get mobileLoans() {
    return this.$store.state.loanCategories.data.data.filter(
      (loan: any) => loan.loan_category == "mobile"
    );
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

  calculateIntrest() {
    return "";
  }
  /* @Watch("loan")
  myFunction() {
    console.log("");
  } */
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
  padding-left: 100px;
  padding-right: 100px;
}
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600");

/* VARS */
$open-sans: "Open Sans", "Helvetica", sans-serif;

$darkNavy: #213140;
$teal1: #66b3fb;
$teal2: #4b9dea;
$charcoal: #555555;
$gold: #b6985a;

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
.checkbox:checked + label,
.checkbox:not(:checked) + label {
  position: relative;
  width: 70px;
  display: inline-block;
  padding: 0;
  margin: 0 auto;
  text-align: center;
  margin: 17px 0;
  margin-top: 100px;
  height: 6px;
  border-radius: 4px;
}
.checkbox:checked + label:before,
.checkbox:not(:checked) + label:before {
  position: absolute;
  font-family: "unicons";
  cursor: pointer;
  top: -17px;

  font-size: 20px;
  line-height: 40px;
  text-align: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
}

.checkbox:checked ~ .section .container .row .col-12 p {
  color: var(--dark-blue);
}
.tools {
  margin-right: 16px;
}
.checkbox-tools:checked + label,
.checkbox-tools:not(:checked) + label {
  position: relative;
  display: inline-block;
  padding: 20px;
  width: 200px;
  height: 40px;
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
  color: var(--white);
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
}
.checkbox-tools:not(:checked) + label {
  background-color: white;
}
.checkbox-tools:checked + label {
  background-color: white;
  border-left: $primaryColor solid 4px;
}

.checkbox-tools:checked + label::before,
.checkbox-tools:not(:checked) + label::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-image: linear-gradient(298deg, var(--red), var(--yellow));
}
.checkbox-tools:checked + label .uil,
.checkbox-tools:not(:checked) + label .uil {
  font-size: 24px;
  line-height: 24px;
  display: block;
  padding-bottom: 10px;
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
  flex-direction: column;
  justify-content: center;
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
.filters,
.summary {
  width: 50%;
  padding: 50px;
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
      font-size: 20px;
      font-weight: bold;
      text-align: end;
    }
    span:nth-child(1) {
      font-size: 24px;
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
.summary {
  background-color: rgb(238, 238, 238);
  display: flex;
  flex-direction: column;
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
    padding-left: 0;
    padding-right: 0;
  }
  .summary {
    background-color: transparent;
    margin-top: 40px;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
  }
  .filters {
    width: 100%;
    padding: 50px;
    padding-left: 0;
    padding-right: 0;
    align-items: center;
  }
  .filter-option {
    justify-content: center;
    align-items: center;
  }
  .buttons {
    justify-content: center;
  }
  .toggle {
    justify-content: center;
  }
}
</style>
