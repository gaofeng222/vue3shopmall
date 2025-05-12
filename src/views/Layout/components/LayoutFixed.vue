<script setup>
import { computed, ref } from 'vue'
import {useRoute } from 'vue-router'
// vueUse
import { useScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia'
const { y } = useScroll(window)
const route = useRoute()
import { useCategoryStore } from '@/store/modules/categoryStore'
const cateStore = useCategoryStore()

const { categoryList } = storeToRefs(cateStore)

const isShow = computed(() => {
  return y.value > 90
})
// TODO: 激活样式
const activeClass = ref('active')
</script>

<template>
    <transition name="fade-up" mode="out-in">
      <div class="app-header-sticky" v-show="isShow">
        <div class="container">
            <router-link class="logo" to="/" />
            <!-- 导航区域 -->
            <ul class="app-header-nav">
                <li class="home">
                    <router-link to="/">首页</router-link>
                </li>
                <li class="home" v-for="item in categoryList" :key="item.id">
                    <router-link :active-class="activeClass" :to="`/category/${item.id}`">{{ item.name }}</router-link>
                </li>
            </ul>
            <div class="right">
                <router-link to="/">品牌</router-link>
                <router-link to="/">专题</router-link>
            </div>
        </div>
    </div>
    </transition>
</template>


<style scoped lang='scss'>

/* 下面我们会解释这些 class 是做什么的 */
.fade-up-enter-active,
.fade-up--leave-active {
  transform: translateY(0);
  opacity: 1;
}

.fade-up-enter-active {
  transition: all 1s ease-out;
}

.fade-up--leave-active {
  transition: all .8s ease-out;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.app-header-sticky {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;
    // 此处为关键样式!!!
    // 状态一：往上平移自身高度 + 完全透明
    
    /* opacity: 0; */

    // 状态二：移除平移 + 完全不透明
    /* &.show {
        transition: all 0.3s linear;
        transform: translateY(0);
        opacity: 1;
    } */

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 200px;
        height: 80px;
        background: url("@/assets/images/logo.png") no-repeat right 2px;
        background-size: 160px auto;
    }

    .right {
        width: 220px;
        display: flex;
        text-align: center;
        padding-left: 40px;
        border-left: 2px solid $xtxColor;

        a {
            width: 38px;
            margin-right: 40px;
            font-size: 16px;
            line-height: 1;

            &:hover {
                color: $xtxColor;
            }
        }
    }
}

.app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
        margin-right: 40px;
        width: 38px;
        text-align: center;

        a {
            font-size: 16px;
            line-height: 32px;
            height: 32px;
            display: inline-block;

            &:hover {
                color: $xtxColor;
                border-bottom: 1px solid $xtxColor;
            }
        }

        .active {
            color: $xtxColor;
            border-bottom: 1px solid $xtxColor;
        }
    }
}
</style>