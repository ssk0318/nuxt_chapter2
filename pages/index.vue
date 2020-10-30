<template>
  <div class="container">
    <index1 class="item"></index1>
    <index2 class="item"></index2>
  </div>
</template>

<script>
import index1 from '../components/index1.vue'
import index2 from '../components/index2.vue'

export default {
  components: {
    index1,
    index2
  }
}
</script>

<style>
.container {
  display: flex;
}
.item {
  margin: 10px;
  padding: 10px;
}
</style>
