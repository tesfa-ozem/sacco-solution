<template>
  <div id="app">
    <template v-if="this.$router.currentRoute.path == '/'">
      <router-view></router-view>
    </template>
    <template v-else>
      <div>
        <SideNav
          v-bind:style="{ width: active ? '300px' : '0px' }"
          v-if="windowWidth > 939"
        />
        <MobileMenu v-if="windowWidth < 939" />
        <div class="main" v-bind:style="{ marginLeft: active ? '300px' : '0' }">
          <DynamicHeader v-on:toggle-nav="openNav()" v-if="windowWidth > 939" />

          <transition name="component-fade" mode="out-in">
            <router-view />
          </transition>
          <div class="footer">
          <div class="footer-container">
            <span class="footer-title">Nothing.</span>
            <span class="footer-description"
              >ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
              numquam voluptates nostrum molestiae atque? Perspiciatis fugiat
              corporis,
            </span>
            <button>Ask Anything</button>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        </div>
        
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SideNav from "@/components/SideNav.vue";
import DynamicHeader from "@/components/Header.vue";
import MobileMenu from "@/components/MobileMenu.vue";
@Component({
  name: "App",
  components: {
    SideNav,
    DynamicHeader,
    MobileMenu,
  },
})
export default class App extends Vue {
  active = true;
  openNav() {
    this.active = !this.active;
  }
  created() {
    window.addEventListener("resize", () =>
      this.$store.commit("setWindowWidth")
    );
  }
  get windowWidth() {
    return this.$store.state.windowWidth;
  }
  @Watch("windowWidth")
  myFunction() {
    console.log("it was: " + this.windowWidth);
    if (this.windowWidth > 939) {
      this.active = true;
    } else {
      this.active = false;
    }
  }
}
</script>

<style lang="scss">
$primaryColor: #2f46a7;
$accentColor: #54cadc;
$textColor: #314172;
body {
  margin: 0px;
  height: 100%;
  font-family: 'Nunito san';
}
#app {
  font-family: "Nunito Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #eff3f6;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.main {
  transition: margin-left 0.5s;
  margin-top: 70px;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@media only screen and (max-width: 600px) {
  .main {
    margin-top: 0;
    padding-top: 50px;
  }
}
// footer
.footer {
  margin-top: 30px;
  margin-left: 230px;
  margin-right: 230px;
  display: flex;
  flex-direction: row;
}
.footer-container {
  display: flex;
  flex-direction: column;
  width: 20%;
  text-align: start;
}
.footer-title {
  color: $textColor;
  font-size: 26px;
  margin-bottom: 20px;
}
.footer-description {
  text-align: start;
  font-size: 16px;
  color: rgb(73, 73, 73);
}
</style>
