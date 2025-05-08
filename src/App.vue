<script setup>
import { ref, onMounted } from 'vue'
import {getList} from '@/apis/test'
onMounted(async () => {
  const res = await getList()
  console.log(res)
})
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
