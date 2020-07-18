<template>
  <div class="home">
    <p class="title">Hi {{ user.name }},Welcome to your dashboard</p>
    <div class="actions">
      <div class="action-container">
        <div class="icons-container">
          <MoneyIcon class="icon" />
        </div>
        <button class="action-button">Payments</button>
      </div>
      <div class="action-container">
        <div class="icons-container">
          <personIcon class="icon" />
        </div>
        <button class="action-button" @click="$router.push('/calculator')">
          Loans
        </button>
      </div>
      <div class="action-container">
        <div class="icons-container">
          <fileIcon class="icon" />
        </div>
        <button class="action-button">Activities</button>
      </div>
    </div>
    <div class="stats">
      <p>Stats</p>
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-card-title">
            <span class="stat-name">Deposits</span>
            <span class="count"
              >KES {{ formatPrice(user.current_deposits) }}</span
            >
          </div>
          <div class="start-icon">
            <i class="las la-plus-circle la-2x"></i>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-title">
            <span class="stat-name">Outstanding Loan</span>
            <span class="count">KES {{ formatPrice(user.current_loan) }}</span>
          </div>
          <div class="start-icon">
            <i class="las la-plus-circle la-2x"></i>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-title">
            <span class="stat-name">Total Share</span>
            <span class="count">{{ user.current_shares }}</span>
          </div>
          <div class="start-icon">
            <i class="las la-plus-circle la-2x"></i>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-title">
            <span class="stat-name">Savings</span>
            <span class="count">{{ user.current_savings }}</span>
          </div>
        </div>
      </div>
      <p>Recent</p>
    </div>
    <div class="stats">
      <Table />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Component, Prop, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import MoneyIcon from "@/assets/svg/money.svg";
import personIcon from "@/assets/svg/person.svg";
import fileIcon from "@/assets/svg/files.svg";
import Table from "@/components/Table.vue";

@Component({
  components: {
    HelloWorld,
    MoneyIcon,
    personIcon,
    fileIcon,
    Table
  }
})
export default class Home extends Vue {
  created() {
    this.$store.dispatch("getLoanCategories");
  }
  formatPrice(value) {
    this.val = (value / 1).toFixed(2).replace(",", ".");
    return this.val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  get user() {
    return this.$store.state.user.data;
  }
}
</script>
<style lang="scss" scoped>
$primaryColor: #2f46a7;
$accentColor: #54cadc;
$textColor: #314172;
.home {
  display: flex;
  flex-direction: column;
   margin-top: 20px;
}
.title {
  color: $textColor;
  font-size: 36px;
  margin-bottom: 50px;
}
.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 20px;
  .action-container {
    display: flex;
    flex-direction: column;
    height: 200px;
    align-items: center;
  }
}
.action-button {
  background-color: transparent;
  color: $textColor;
  font-size: 20px;
  border: solid $textColor 0.1em;
  border-radius: 5px;
  width: 200px;
  height: 40px;
  margin-top: 20px;
}
.icons-container {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.icon {
  height: 70px;
  width: 70px;
}
.stats {
  padding-left: 34px;
  padding-right: 34px;
  display: flex;
  flex-direction: column;
  p {
    color: $textColor;
    text-align: start;
  }

  .stat-card {
    height: 150px;
    width: 350px;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    .start-icon {
      display: flex;
      flex-direction: column;
      height: 50%;
      color: $accentColor;
    }
    -webkit-box-shadow: 0px 3px 5px 2px rgba(161, 161, 161, 0.09);
    -moz-box-shadow: 0px 3px 5px 2px rgba(161, 161, 161, 0.09);
    box-shadow: 0px 3px 5px 2px rgba(161, 161, 161, 0.09);
  }

  .stat-card-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .stat-name {
      font-size: 18px;
      color: rgb(136, 136, 136);
    }
    .count {
      font-size: 26px;
      font-weight: 600;
      color: $textColor;
    }
  }
}
.stats-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
@media only screen and (max-width: 600px) {
    .home {
  display: flex;
  flex-direction: column;
   margin-top: 5px;
}
  .stat-card {
    width: 100px;
  }
  .actions {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-top: 20px;
    .action-container {
      display: flex;
      flex-direction: column;
      height: 200px;
      align-items: center;
    }
  }
  .stats-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 700px;
  }
  .stats {
    padding: 0;
    p {
      color: $textColor;
      text-align: center;
    }
  }
  .title {
    color: $textColor;
    font-size: 28px;
    margin-bottom: 10px;
    padding: 4px;
  }
}
</style>
