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
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app {
  width: 980px;
  margin: 100px auto 0;
}
</style>
