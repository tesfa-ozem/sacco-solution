<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <template v-if="this.$router.currentRoute.meta.guest == true"
      ><div>
        <transition name="component-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </template>
    <template v-else>
      <div>
        <SideNav
          v-bind:style="{ width: active ? '300px' : '0px' }"
          v-if="windowWidth > 939"
        />
        <div class="topnav" id="myTopnav">
          <a href="#" @click="toggale = !toggale" class="active"
            ><i class="las la-bars la-2x"></i
          ></a>
        </div>

        <MobileMenu
          :style="{ marginLeft: toggale ? '0px' : '-250px' }"
          v-on:toggle-nav="openNav"
          v-if="windowWidth < 939"
        />
        <div class="main">
          <DynamicHeader v-if="windowWidth > 939" />

          <transition name="component-fade" mode="out-in">
            <router-view />
          </transition>
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
  components: {
    SideNav,
    DynamicHeader,
    MobileMenu,
  },
})
export default class App extends Vue {
  active = true;
  toggale = false;
  openNav(e: any) {
    this.toggale = e;
    console.log(e);
    
    /* this.active = !this.active; */
  }
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  }
  
  created() {
    window.addEventListener("resize", () =>
      this.$store.commit("setWindowWidth")
    );
     //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress
        // parse meta tags
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  
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
  font-family: "Nunito san";
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
  margin-left: 300px;
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
    padding-top: 0px;
    margin-left: 0px;
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

// Top Nav
.topnav {
  background-color: rgba(163, 163, 163, 0);
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add an active class to highlight the current page */
.topnav a.active {
  background-color: #2f46a7;
  color: white;
}

/* Hide the link that should open and close the topnav on small screens */
.topnav .icon {
  display: none;
}
</style>
