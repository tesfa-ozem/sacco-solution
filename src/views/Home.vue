<template>
  <div class="home">
    <p class="title">Hi Tesfa,Welcome to your dashboard</p>
    <div class="actions">
      <div class="action-container">
        <div class="icons-container">
          <MoneyIcon class="icon" />
        </div>
        <button class="action-button">Create Invoice</button>
      </div>
      <div class="action-container">
        <div class="icons-container">
          <personIcon class="icon" />
        </div>
        <button class="action-button">Add a castomer</button>
      </div>
      <div class="action-container">
        <div class="icons-container">
          <fileIcon class="icon" />
        </div>
        <button class="action-button">Create a service</button>
      </div>
    </div>
    <div class="stats">
      <p>Stats</p>
      <div class="stats-container">
        <div class="stat-card">
            <div class="stat-card-title">
                <span class="stat-name">Customers</span>
                <span class="count"> 28</span>
            </div>
            <div class="start-icon">
                <i class="las la-plus-circle la-2x"></i>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-card-title">
                <span class="stat-name">Invoices</span>
                <span class="count"> 210</span>
            </div>
            <div class="start-icon">
                <i class="las la-plus-circle la-2x"></i>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-card-title">
                <span class="stat-name">Services</span>
                <span class="count"> 12</span>
            </div>
            <div class="start-icon">
                <i class="las la-plus-circle la-2x"></i>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-card-title">
                <span class="stat-name">This Month</span>
                <span class="count"> KSH 14,200</span>
            </div>
            
        </div>
      </div>
      <p>Recent</p>
    </div>
    <div class="stats">
        <Table/>
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
import Table from "@/components/Table.vue"

@Component({
  name: "Home",
  components: {
    HelloWorld,
    MoneyIcon,
    personIcon,
    fileIcon,
    Table
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
$primaryColor: #2f46a7;
$accentColor:#54CADC;
$textColor: #314172;
.home {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.title {
  color: $textColor;
  font-size: 36px;
  margin-bottom: 150px;
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
  border: solid $textColor 0.1em;
  border-radius: 5px;
  width: 200px;
  height: 40px;
  margin-top: 20px;
}
.icons-container {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.icon {
  height: 50px;
  width: 50px;
}
.stats {
  padding-left: 220px;
  padding-right: 220px;
  display: flex;
  flex-direction: column;
  p {
    color: $textColor;
    text-align: start;
  }
  
  .stat-card{
      height: 150px;
      width: 250px;
      background-color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      .start-icon{
          display: flex;
          flex-direction: column;
          height: 50%;
          color: $accentColor;
      }
      -webkit-box-shadow: 0px 3px 5px 2px rgba(161,161,161,0.09);
-moz-box-shadow: 0px 3px 5px 2px rgba(161,161,161,0.09);
box-shadow: 0px 3px 5px 2px rgba(161,161,161,0.09);
      
  }
  
  .stat-card-title{
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .stat-name{
              font-size: 18px;
              color: rgb(136, 136, 136);
          }
          .count{
              font-size: 32px;
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
  .stats{padding: 0;
  p {
    color: $textColor;
    text-align: center;
  }}
  .title {
  color: $textColor;
  font-size: 36px;
  margin-bottom: 10px;
}
}
</style>
