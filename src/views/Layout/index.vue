<template>
    <LayoutNav />
    <LayoutHeader />
    <LayoutFixed />
    <div class="content-main">
        <!-- 强制路由更新 -->
        <router-view :key="$route.fullPath"></router-view>
        <!-- <router-view></router-view> -->
    </div>
    <LayoutFooter />
</template>
<script setup>
import { onMounted } from 'vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryStore } from '@/store/modules/categoryStore'
const cateStore = useCategoryStore()
const { getCategoryList } = cateStore

onMounted(() => {
    getCategoryList()
})
</script>

<style lang="scss" scoped>
.content-main{
    /* height: 600px; */
}
</style>
