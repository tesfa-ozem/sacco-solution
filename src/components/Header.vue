<template>
  <div class="header-container">
    <button @click="$emit('toggle-nav')">
      <i class="las la-bars la-2x"></i>
    </button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "",
  components: {}
})
export default class DynamicHeader extends Vue {
  created() {
    // window.addEventListener('scroll',function(){} );
  }
}
</script>

<style lang="scss" scoped>
$shocking-pink: #ff1ead;
.header-container {
  background-color: white;
  position: fixed;
  height: 70px;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: top 0.3s;
  -webkit-box-shadow: 0px 3px 5px 2px rgba(161, 161, 161, 0.09);
  -moz-box-shadow: 0px 3px 5px 2px rgba(161, 161, 161, 0.09);
  box-shadow: 0px 3px 5px 2px rgba(161, 161, 161, 0.09);
}
.header-container a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 15px;
  text-decoration: none;
}

button {
  border: transparent;
  background-color: transparent;
}
</style>
