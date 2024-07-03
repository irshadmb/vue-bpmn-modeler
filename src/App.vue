<!--
  This Vue file represents the main application component.
  It imports and uses the BPMN component.
  
  Author: Irshad Ahamed.M.B
  License: MIT
-->
<template>
  <BPMN/>
</template>

<script>
import BPMN from './components/BPMN.vue'

export default {
  name: 'App',
  components: {
    BPMN
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>