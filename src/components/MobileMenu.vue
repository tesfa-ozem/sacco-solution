<template>
  <div id="mySidenav" class="sidenav">
      <a  class="closebtn"
      v-on:click="$emit('toggle-nav',false)" 
        >&times;</a
      >
      <a
          v-for="menu in menus"
          :key="menu.name"
          @click="navigate(menu)"
          class="nav-item"
          href="#"
          >{{ menu.name }}</a
        >
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import menu from "../menu";
import router from "../router";
@Component({
  name: "",
  components: {},
})
export default class MobileMenu extends Vue {
  menus = [...menu];
  isActive = true;
  get currentRout(){
      return this.$router.currentRoute.path
  }
  navigate(menu: any) {
      console.log(this.currentRout)
      this.$emit('toggle-nav',false)
    this.$router.push(menu.path);
  }
}
</script>

<style lang="scss" scoped>
.sidenav {
  height: 100%;
  width: 250px;
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: flex-start;
  justify-items: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  z-index: 1;
  top: 0;
  left: 0;
  background-color:#2f46a7;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: rgb(207, 207, 207);
 
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
