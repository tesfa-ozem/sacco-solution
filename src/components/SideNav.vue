<template>
  <div class="sidebar">
    <div class="nav-header"></div>
    <div
      v-for="menu in menus"
      :key="menu.name"
      class="nav-tabs"
      @click="$router.push(menu.path)"
    >
      <div class="icon">
        <i v-bind:class="[menu.icon]"></i>
      </div>
      <div class="tab-name">{{ menu.name }}</div>
    </div>
    <button @click="logout()"><i class="las la-plus"></i> Logout</button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import menu from "../menu";
import router from "../router";

@Component({
  name: "SideNav",
  components: {}
})
export default class SideNav extends Vue {
  menus = [...menu];
  logout() {
    console.log("");
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #2f46a7;
  overflow-x: hidden;
  
  transition: 0.5s;
}
.nav-tabs {
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  padding-bottom: 10px;
  color: rgb(207, 207, 207);
}
.icon {
  display: flex;
  padding-left: 40px;
  justify-content: end;
  align-items: flex-end;
}
.tab-name {
  display: flex;
  padding-left: 15px;
  justify-content: start;
  text-align: start;
  align-items: center;
}
.nav-tabs:hover {
  background-color: rgb(207, 207, 207);
  color: rgb(42, 42, 42);
  cursor: default;
}
.nav-header {
  height: 70px;
  background-color: #2f46a7;
}
button {
  margin-top: 20px;
  background-color: #5acadc;
  width: 70%;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
}
@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}
</style>
