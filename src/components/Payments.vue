<template>
  <div class="payments-container">
    <div class="title">Deposits</div>
    <div class="input">
      <span>Product Type </span>
      <ejs-dropdownlist
        id="dropdownlist"
        popupHeight="200px"
        popupWidth="150px"
        :dataSource="products"
        v-model="selectedProduct"
        placeholder="Select Product"
      ></ejs-dropdownlist>
    </div>
    <div class="input">
      <span>Amount</span>
      <input placeholder="KSH." />
    </div>
    <div class="input">
      <span>Phone Number</span>
      <input placeholder="254..." oninput="this.className = ''" v-model="paymentPhone"/>
    </div>
    <button @click="makePayment()">Pay</button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "tab-deposits",
  components: {},
})
export default class Payments extends Vue {
  products = ["deposits", "shares"];
  selectedProduct = "";
  paymentPhone = 0

  makePayment() {
    const data = {
      header: {
        "transaction_type": "normal",
      },
      lines: [
        {
          "transaction_type": this.selectedProduct,
          amount: 1,
        },
      ],

      phone: this.paymentPhone,
    };
    this.$store
      .dispatch("makePayment", data)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        if (err.response) {
          

          console.log(err.response);
        }
      });
  }
}
</script>

<style lang="scss" scoped>
$textColor: #314172;

.payments-container {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: space-evenly;
  padding-right: 30px;
  padding-left: 30px;
  width:70%;
  height: -webkit-fill-available;
}
.title {
  color: $textColor;
  font-size: 22px;
  font-weight: bold;
  
}
.input {
  width:50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span:first-child {
    color: $textColor;
    font-weight: bold;
  }
  span:nth-child(2) {
    color: rgb(233, 47, 47);
    display: inline;
  }
  span:last-child {
    font-size: 10px;
    color: rgb(233, 47, 47);
  }
}
input {
  padding: 10px;
  font-size: 16px;
  width: 100%;
  background: #f4f4f4;
  border: 1px #aaaaaa;
  border-style: none none solid none;
}
input:focus {
  background: rgb(230, 230, 230);
  border: 2px solid #002d9c;
  border-radius: 0px;
}
/* Mark input boxes that gets an error on validation: */
input.invalid {
  background-color: #ffdddd;
}
button {
  background: $textColor;
  color: white;
  border: none;
  height: 40px;
  width: 120px;
}
</style>
