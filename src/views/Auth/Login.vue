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

      <!-- Circles which indicates the steps of the form: -->
      <div id="regForm">
        <img src="../../assets/logo.jpg" height="200" width="200" />
        <div class="form-row">
          <div class="input">
            <span>Email/Username</span>
            <input
              v-model.trim="mail"
              type="email"
              placeholder="Email or username..."
            />
          </div>
        </div>
        <div class="form-row">
          <div class="input">
            <span>Password</span>
            <input
              v-model.trim="pass"
              type="password"
              placeholder="Password..."
            />
          </div>
        </div>

        <div class="action-buttons">
          <span
            >or <a href="#" @click="$router.push('/signup')">register</a> if you
            dont have an account</span
          >
          <div>
            <button v-on:click="login()">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Login extends Vue {
  mail = "";
  pass = "";
  content = "Login";
  cssClass = "e-hide-spinner";
  error = "null";
  successful = 0;

  login() {
    console.log(this.error);
    const auth = {
      username: this.mail,
      password: this.pass
    };
    this.$Progress.start()
    this.$store
      .dispatch("singin", auth)
      .then(res => {
        this.successful = res.status;

        this.$store.dispatch("getLedger");
        this.$store.dispatch("fetchUser").then(res => {
            this.$Progress.finish()
          this.$router.push("/home").catch(err => {
            console.log(err);
          });
        });
      })
      .catch(err => {
           this.$Progress.fail()
        if (err.response) {
          this.error = err == null ? "null" : "not";

          this.$store.commit("setAnimation", false);
          console.log(err.response);
        }
      });
  }

  register() {
    this.$router.push("/signup");
  }

  get isLoggedIn() {
    return this.$store.getters.isLoggedIn;
  }

  logout() {
    this.$store.dispatch("logout").then(() => {
      this.$router.replace("/home");
    });
  }
}
</script>

<style lang="scss" scoped>
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
  height: 50%;
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
  @media only screen and (max-width: 600px) {
    .side-image {
      display: none;
    }
  }
}
img {
  display: none;
}
/* Style the form */
#regForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 24%;
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
@media only screen and (max-width: 600px) {
  .form-container {
    height: 100%;
    width: 100%;
    justify-content: flex-end;
  }
  #regForm {
    width: 100%;
  }
  .action-buttons {
    height: 20%;
    flex-direction: column-reverse;
    justify-content: flex-start;
  }
  img {
    display: block;
  }
}
</style>
