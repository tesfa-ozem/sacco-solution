<template>
  <div class="main-container">
    <div class="form-container">
      <div class="side-image">
        <span>Unlock your acount</span>
        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </span>
        <span
          >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non ad
          quisquam praesentium facilis commodi error sint neque consectetur
          repudiandae facere vitae harum laborum, enim cupiditate eius quaerat
          sequi sunt! Placeat.</span
        >
        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </span>
      </div>

      <!-- <div style="text-align:center;margin-top:40px;">
            <span
              class="step"
              v-bind:class="currentTab == 1 ? 'active' : ''"
            ></span>
            <span
              class="step"
              v-bind:class="currentTab == 2 ? 'active' : ''"
            ></span>
            <span
              class="step"
              v-bind:class="currentTab == 3 ? 'active' : ''"
            ></span>
            <span
              class="step"
              v-bind:class="[
                currentTab == 4 ? 'active' : '',
                currentTab == 4 ? 'finish' : '',
              ]"
            ></span>
          </div> -->
      <!-- One "tab" for each step in the form: -->
      <!-- <transition name="fade" mode="out-in">
            <div
              class="tab"
              
              v-if="currentTab == 1"
              key="1"
            >
              
              <div class="" >
                
                <input
                  placeholder="First name..."
                  oninput="this.className = ''"
                />
              </div>
              <div>
                <input
                  placeholder="Last name..."
                  oninput="this.className = ''"
                />
              </div>
            </div>

            <div
              
              class="tab"
              v-else-if="currentTab == 2"
              key="2"
            >
              Contact Info:
              <p>
                <input placeholder="E-mail..." oninput="this.className = ''" />
              </p>
              <p>
                <input placeholder="Phone..." oninput="this.className = ''" />
              </p>
            </div>

            <div
              
              class="tab"
              v-else-if="currentTab == 3"
              key="3"
            >
             
              <p><input placeholder="dd" oninput="this.className = ''" /></p>
              <p><input placeholder="mm" oninput="this.className = ''" /></p>
              <p><input placeholder="yyyy" oninput="this.className = ''" /></p>
            </div>

            <div
              
              class="tab"
              v-else-if="currentTab == 4"
              key="4"
            >
              
              <p>
                <input
                  placeholder="Username..."
                  oninput="this.className = ''"
                />
              </p>
              <p>
                <input
                  placeholder="Password..."
                  oninput="this.className = ''"
                />
              </p>
            </div>
          </transition>
          <div style="overflow:auto;">
            <div style="float:right;">
              <button
                type="button"
                id="prevBtn"
                @click="nextPrev(-1)"
                v-if="currentTab != 1"
              >
                Previous
              </button>
              <button type="button" id="nextBtn" @click="nextPrev(1)">
                {{ buttonText }}
              </button>
            </div>
          </div> -->

      <!-- Circles which indicates the steps of the form: -->
      <div id="regForm">
        <div>
          <span
            class="step"
            v-bind:class="currentTab == 1 ? 'active' : ''"
          ></span>
          <span
            class="step"
            v-bind:class="currentTab == 2 ? 'active' : ''"
          ></span>

          <span
            class="step"
            v-bind:class="[
              currentTab == 3 ? 'active' : '',
              currentTab == 3 ? 'finish' : ''
            ]"
          ></span>
        </div>
        <transition name="fade" mode="out-in">
          <div class="tabs" v-if="currentTab == 1" key="1">
            <div class="form-row">
              <div class="input">
                <span>First Name</span>
                <input  v-model="userFormGroup.props.firstName"  placeholder="First name..." />
                 <span v-if="userFormGroup.controls.firstName.errors">{{
                  userFormGroup.controls.firstName.errorMessage
                }}</span>
              </div>
              <div class="input">
                <span>Last Name</span>
                <input v-model="userFormGroup.props.lastName" placeholder="Last name..." />
                <span>{{
                  userFormGroup.controls.lastName.errorMessage
                }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="input">
                <div><span>Id/Passport Number</span><span> *</span></div>
                <input
                  placeholder="ID NO..."
                  type="text"
                  v-model="userFormGroup.props.idNumber"
                />
                <span v-if="userFormGroup.controls.idNumber.errors">{{
                  userFormGroup.controls.idNumber.errors.maxLength.message
                }}</span>
              </div>
            </div>
            <div class="form-row">
              <div class="input">
                <div><span>Phone</span><span> *</span></div>
                <input
                  v-model="userFormGroup.props.phoneNumber"
                  placeholder="Phone..."
                  type="text"
                />
                <span v-if="userFormGroup.controls.phoneNumber.errors">{{
                  userFormGroup.controls.phoneNumber.errors.maxLength.message
                }}</span>
              </div>
              <div class="input">
                <span>Email </span>
                <input
                  v-model="userFormGroup.props.email"
                  placeholder="Email address..."
                  type="email"
                />
                <span v-if="userFormGroup.controls.email.errors">{{userFormGroup.controls.email.errors.email.message}}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="input">
                <span>Password</span>
                <input
                  v-model="userFormGroup.props.password" 
                  type="password"
                  placeholder="Password..."
                />
                <span v-if="userFormGroup.controls.password.errors">{{
                  userFormGroup.controls.password.errors.compare.message 
                }}</span>
              </div>
            </div>
            <div class="form-row">
              <div class="input">
                <span>Confirm Password</span>
                <input type="password" v-model="userFormGroup.props.confirmPassword" placeholder="Password..." />
                <span v-if="userFormGroup.controls.confirmPassword.errors">{{userFormGroup.controls.confirmPassword.errors.compare.message}}</span>
              </div>
            </div>
          </div>

          <div class="tabs" v-if="currentTab == 2" key="2">
            <div class="form-row">
              <div class="input">
                <div><span>KRA Pin</span><span> *</span></div>
                <input placeholder="AR80..." v-model="kraPin" />
                <!-- <span>{{
                  firstName == "" ? validate(true) : validate(false)
                }}</span> -->
              </div>
              <div class="input">
                <div><span>Occupation</span><span> *</span></div>
                <input placeholder="Occupation..." v-model="occupation" />
              </div>
            </div>
            <div class="form-row">
              <div class="input">
                <span>Physical Address</span>
                <input
                  v-model="address"
                  placeholder="Physical Address..."
                  oninput="this.className = ''"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="input">
                <span>Postal Address</span>
                <input placeholder="PO Box..." oninput="this.className = ''" />
              </div>
            </div>
            <div class="form-row default">
              <div class="input ">
                <div><span>Date of birth</span><span> *</span></div>
                <ejs-datepicker
                  id="datepicker"
                  v-model="dateOfBirth"
                  :placeholder="waterMarkText"
                ></ejs-datepicker>
              </div>
              <div class="input">
                <span>Gender </span>
                <ejs-dropdownlist
                  id="dropdownlist"
                  popupHeight="200px"
                  popupWidth="150px"
                  :dataSource="gender"
                  v-model="selectedGender"
                  placeholder="Select Gender"
                ></ejs-dropdownlist>
              </div>
              <div class="input">
                <span>Marital Status </span>
                <ejs-dropdownlist
                  id="dropdownlist"
                  popupHeight="200px"
                  popupWidth="200px"
                  v-model="selectedMaritalSatus"
                  :dataSource="maritalStatus"
                  placeholder="Select Marital Status"
                ></ejs-dropdownlist>
              </div>
            </div>
          </div>
          <div class="tabs" v-if="currentTab == 3" key="3">
            <div class="payment-title">
              <div class="icon-continer">
                <i class="las la-exclamation la-3x"></i>
              </div>
              <span> Waiting for payment</span>
              <span>Make sure you use get confirmation of your payment</span>
            </div>
            <div class="transaction-details">
              <span>Registration fee balance KSH {{ registationFee }}</span>
            </div>
            <div class="form-row">
              <div class="input">
                <span>Payment Phone Number</span>
                <input
                  placeholder="254..."
                  type="tel"
                  v-model.number.trim="paymentPhone"
                />
              </div>
            </div>
          </div>
        </transition>

        <div class="action-buttons">
          <span
            >or <a href="#" @click="$router.push('/')">login</a> if you have an
            account</span
          >
          <div class="buttons">
            <button
              v-if="currentTab != 1 && currentTab != 3"
              type="button"
              id="prevBtn"
              @click="nextPrev(-1)"
            >
              Previous
            </button>

            <button type="button" id="nextBtn" @click="nextPrev(1)">
              {{ currentTab == 3 ? "Pay" : "Next" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(DropDownListPlugin);
Vue.use(DatePickerPlugin);
import { RxFormBuilder, IFormGroup } from "@rxweb/reactive-forms"
import { User} from "@/models/UserModel.ts"

@Component
export default class SignUp extends Vue {
  buttonText = "Next";
  
  href = "";
  gender = ["male", "female"];
  selectedGender = "";
  maritalStatus = ["married", "single"];
  selectedMaritalSatus = "";
  dateOfBirth = "";
  address = "";
  content = "Sign Up";
  cssClass = "e-hide-spinner";
  error = "null";
  successful = 0;
  waterMarkText = "date";
  dateFormat = "yyyy-MM-dd";
  currentTab = 1;
  position = { X: "Center", Y: "Top" };
  errorMessage = "Cant be empty";
  emptyName = "";
  emptyLastName = "";
  kraPin = "";
  occupation = "";
  paymentPhone = 254;
        userFormGroup!: IFormGroup<User>;
        formBuilder: RxFormBuilder = new RxFormBuilder();

        constructor() {
            super();
            this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
        }
  /* get currentTab(){
      if(this.$store.state.user?.data?.state=='draft'){
          return 2
      }else{
          return this.tabNo
      }
  }
  set currentTab(val){
      this.tabNo + val
  } */
  mounted() {
    console.log(this.$store.state.user?.data);
    if (
      this.$store.state.user?.data?.data_type == "member_application" &&
      this.$store.state.user?.data?.state == "payment"
    ) {
      this.currentTab = 3;
    } else if (
      this.$store.state.user?.data?.data_type == "member_application"
    ) {
      this.currentTab = 2;
    }
  }
  get registationFee() {
    return this.$store.state.user?.data?.registration_fee_balance;
  }
  register() {
    const data = {
      "username": this.userFormGroup.props.email,
      "password": this.userFormGroup.props.password,
      "name": this.userFormGroup.props.firstName + " " + this.userFormGroup.props.lastName,
      "email": this.userFormGroup.props.email,
      "phone_no": this.userFormGroup.props.phoneNumber,
      "idno": this.userFormGroup.props.idNumber
    };
    if(!this.userFormGroup.invalid){
        this.$store
      .dispatch("signup", data)
      .then(resp => {
        console.log(resp);
        this.successful = resp.status;
        this.fetchToken();
      })
      .catch(err => {
        if (err.response) {
          this.errorMessage = err.response.data.message;
          alert(err.response.data.message);
          console.log(err.response);
        } /*  else if (err.request) {
      // client never received a response, or request never left
    } else {
      // anything else
    } */
        this.error = err == null ? "null" : "not";
      });
    }else{
        console.log(this.userFormGroup.controlsError)
        alert(this.userFormGroup.controlsError)
    }
    
  }
  updateDetails() {
    const data = {
     " marital_status": this.selectedMaritalSatus,
      "gender": this.selectedGender,
      "address": this.address,
      "date_of_birth": this.dateOfBirth,
      "home_address": this.address
    };
    this.$store.dispatch("updateUser", data).then(resp => {
      console.log(resp);
      this.successful = resp.status;
      this.currentTab = 3;
    });
  }
  fetchToken() {
    const auth = {
      "username": this.userFormGroup.props.email,
      "password": this.userFormGroup.props.password
    };
    this.$store.dispatch("fetchToken", auth).then(resp => {
      this.currentTab = 2;
    });
  }
  clickHanlder() {
    this.register();
  }

  get display() {
    return "block";
  }

  isNumber(evt: any) {
    evt = evt ? evt : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  nextPrev(n: any) {
    if (this.currentTab < 4) {
      if (this.currentTab == 2) {
        this.updateDetails();
      } else if (this.currentTab == 3) {
        console.log(this.currentTab);
        this.makePayment();
      } else if (this.currentTab == 1) {
        this.register();
      } else {
        this.currentTab += n;
      }
    }
  }
  makePayment() {
    const data = {
      header: {
        "transaction_type": "registration"
      },
      lines: [
        {
          "transaction_type": "registration",
          "amount": 1
        }
      ],

      "phone": this.paymentPhone
    };
    this.$store
      .dispatch("makePayment", data)
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        if (err.response) {
          this.errorMessage = err.response.data.message;

          console.log(err.response);
        }
      });
  }
}
</script>

<style lang="scss" scoped>
@import "../../../node_modules/@syncfusion/ej2-base/styles/fabric.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/fabric.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/fabric.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/fabric.css";
@import "../../../node_modules/@syncfusion/ej2-vue-calendars/styles/fabric.css";
@import "../../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/fabric.css";
@import "../../../node_modules/@syncfusion/ej2-base/styles/fabric.css";

$primaryColor: #2f46a7;
$accentColor: #54cadc;
$textColor: #314172;
.main-container {
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  //background-image: url('../../assets/background.jpg');
}
.form-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  height: 80%;
}
.side-image {
  width: 24%;
  height: 100%;
  background-image: url("../../assets/unnamed.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: flex-start;
  padding: 24px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  span:first-child {
    text-align: start;
    font-size: 26px;
    color: rgb(227, 225, 255);
  }
  span:nth-child(2) {
    text-align: start;
    margin-top: 24px;
    font-size: 14px;
    color: rgb(212, 212, 212);
  }
  span:nth-child(3) {
    text-align: start;
    margin-top: 24px;
    font-size: 14px;
    color: rgb(212, 212, 212);
  }
  span:nth-child(4) {
    text-align: start;
    margin-top: 24px;
    font-size: 14px;
    color: rgb(212, 212, 212);
  }
}
/* Style the form */
#regForm {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 32%;
  background-color: #ffffff;
  height: 100%;
  min-width: 300px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 16px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
}

h1 {
  text-align: center;
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

/* Hide all steps by default: */

button {
  background-color: $primaryColor;
  color: #ffffff;
  border: none;
  padding: 10px 15px 10px 10px;
  font-size: 17px;
  width: 100px;
  cursor: pointer;
  text-align: start;
}

button:hover {
  border: 2px solid rgb(246, 246, 248);
  outline: 2px solid $primaryColor;
}

#prevBtn {
  background-color: #bbbbbb;
}

/* Make circles that indicate the steps of the form: */
.step {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbbbbb;
  border: none;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.5;
  transition: 0.6s ease;
}

.step.active {
  opacity: 1;
  background-color: $textColor;
}

/* Mark the steps that are finished and valid: */
.step.finish {
  background-color: #4caf50;
}
.form-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 34px;
  justify-content: space-between;
}
.input {
  padding-left: 16px;
  padding-right: 16px;

  width: 100%;
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
.action-buttons {
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  span {
    color: rgb(112, 112, 112);
    margin-left: 16px;
  }
}
.tabs {
  transition: 0.3s cubic-bezier(0.2, 0, 0.38, 0.9);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.2, 0, 0.38, 0.9);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.payment-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  span:nth-child(2) {
    color: chocolate;
    font-size: 24px;
    font-weight: bold;
  }
  span:nth-child(3) {
    color: chocolate;
  }
}
.transaction-details {
  display: flex;
  flex-direction: column;
}
.icon-continer {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: solid rgb(250, 242, 232) 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgb(250, 242, 232);
}
.la-exclamation {
  color: chocolate;
}
@media only screen and (max-width: 600px) {
  .side-image {
    display: none;
  }
  .step {
    height: 10px;
    width: 10px;
  }
  .form-container {
    height: 100%;
    width: 100%;
  }
  #regForm {
    width: 100%;
  }
  .action-buttons {
    flex-direction: column-reverse;
    justify-content: space-evenly;
  }
  .default {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
}
</style>
