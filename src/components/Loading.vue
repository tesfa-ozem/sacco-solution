<template>
  <div v-if="exampleProperty" class="loading">
        <div class="loader"></div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
  
  @Prop()
  exampleProperty!: boolean
}
</script>

<style lang='scss' scoped>
  .loading 
{
 pointer-events: all;
 z-index: 99999;
 border: none;
 margin: 0px;
 padding: 0px;
 width: 100%;
 height: 100%;
 top: 0px;
 left: 0px;
 cursor: wait;
 position: fixed;
 background-color: rgba(0, 0, 0, 0.6);
 display: flex;
 flex-direction:row;
 justify-content: center;
 align-content: center;
 align-items: center;
}
.loader {
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #3498db;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>