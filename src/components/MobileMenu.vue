<template>
  <div>
    <div class="container">
      <input id="toggle" type="checkbox" />

      <label class="toggle-container" for="toggle">
        <span class="button button-toggle"></span>
      </label>

      <!-- The Nav Menu -->
      <nav class="nav">
        <a
          v-for="menu in menus"
          :key="menu.name"
          @click="$router.push(menu.path)"
          class="nav-item"
          href="#"
          >{{ menu.name }}</a
        >
      </nav>

      <!-- Dummy Content -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import menu from "../menu";
import router from "../router";
@Component({
  name: "",
  components: {}
})
export default class MobileMenu extends Vue {
  menus = [...menu];
}
</script>

<style lang="scss" scoped>
$items: 4;
$transition-duration: 0.5s;
$transition-delay: 0.05s;

/* Basic Styles */

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

.container {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: start;
  padding: 50px auto 0;
  width: 100%;
  z-index: 1;
  background-color: #2f46a7;
  overflow: hidden;
}

/* Toggle Functionality */

#toggle {
  display: none; //hides the checkbox
}

// Styles for the 'open' state, if the checkbox is checked
#toggle:checked {
  //Any element you need to change the style if menu is open goes here, using the sibling selector (~)
  & ~ .toggle-container .button-toggle {
    box-shadow: 0 0 0 550px rgba(0, 0, 0, 0.1),
      inset 0 0 0 20px rgba(0, 0, 0, 0.1);

    &:before {
      transform: translateY(-50%) rotate(45deg) scale(1);
    }

    &:after {
      transform: translateY(-50%) rotate(-45deg) scale(1);
    }
  }

  // Open Nav
  & ~ .nav {
    margin-bottom: 100px;
    pointer-events: auto;
    transform: translate(50px, 50px);

    // Restoring nav items from 'lines' in the menu icon
    .nav-item {
      color: rgb(207, 207, 207);
      letter-spacing: 0;
      height: 40px;
      line-height: 40px;
      margin-top: 0;
      opacity: 1;
      transform: scaleY(1);
      transition: $transition-duration, opacity 0.1s;

      // Setting delays for the nav items in open transition
      @for $i from 1 through $items {
        &:nth-child(#{$i}) {
          $delay: ($items - $i) * $transition-delay;
          transition-delay: $delay;
          &:before {
            transition-delay: $delay;
          }
        }
      }

      // Hide the lines
      &:before {
        opacity: 0;
      }
    }
  }

  & ~ .dummy-content {
    padding-top: 30px;

    &:before {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
}

/* Toggle Button */

.button-toggle {
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  margin: 25px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 100%;
  transition: $transition-duration + 0.1;

  // Shadow on Hover
  &:hover {
    box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.1),
      inset 0 0 0 20px rgba(0, 0, 0, 0.1);
  }

  // Making the 'X' icon using `:before` and `:after` pseudo-elements
  // Initially hidden beause of `scale(0)` transformation

  &:before,
  &:after {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgb(207, 207, 207);
    border-radius: 5px;
    transition: $transition-duration;
  }

  &:before {
    transform: translateY(-50%) rotate(45deg) scale(0);
  }

  &:after {
    transform: translateY(50%) rotate(-45deg) scale(0);
  }
}

/* Menu */

.nav {
  display: inline-block;
  margin: 25px 25px 20px;
  pointer-events: none;
  transition: $transition-duration;
}

// Showing nav items as lines, making up the hamburger menu icon
.nav-item {
  position: relative;
  display: inline-block;
  float: left;
  clear: both;
  color: transparent;
  font-size: 14px;
  letter-spacing: -6.2px;
  height: 7px;
  line-height: 7px;
  text-transform: uppercase;
  white-space: nowrap;
  transform: scaleY(0.2);
  transition: $transition-duration, opacity 1s;

  //Set delays for the nav items in close transition
  @for $i from 1 through $items {
    &:nth-child(#{$i}) {
      $delay: ($i - 1) * $transition-delay;
      transition-delay: $delay;
      &:before {
        transition-delay: $delay;
      }
    }
  }

  // Adjusting width for first line
  &:nth-child(1) {
    letter-spacing: -8px;
  }

  // Adjusting width for second line
  &:nth-child(2) {
    letter-spacing: -7px;
  }

  // Adjusting the fourth element onwards
  &:nth-child(n + 4) {
    letter-spacing: -8px;
    margin-top: -7px;
    opacity: 0;
  }

  //getting lines for the hamburger menu icon
  &:before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgb(207, 207, 207);
    transform: translateY(-50%) scaleY(5);
    transition: $transition-duration;
  }
}

/* Dummy Content */

.circle {
  display: inline-block;
  width: 75px;
  height: 75px;
  background-color: #ec7263;
  border-radius: 100%;
}

.text {
  margin: 15px 0 30px;

  span {
    display: inline-block;
    height: 10px;
    margin: 0 5px;
    background-color: #c06162;
    border-radius: 5px;

    &:first-child {
      width: 50px;
    }

    &:last-child {
      width: 80px;
    }
  }
}

.square-top {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 300px;
  background-color: #febe7e;
  z-index: 1;
}

.square-behind {
  display: inline-block;
  position: relative;
  top: -256px;
  width: 250px;
  height: 210px;
  background-color: #c28683;

  &:before,
  &:after {
    position: absolute;
    content: "";
    top: 0;
    width: 40%;
    height: 100%;
  }

  &:before {
    left: 0;
    background-color: #9d567c;
  }

  &:after {
    right: 0;
    background-color: #958c6b;
  }
}
</style>
