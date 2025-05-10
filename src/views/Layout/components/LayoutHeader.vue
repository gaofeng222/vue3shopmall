<script setup>
import { onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
// import HeaderCart from './HeaderCart.vue'

//导入方法
import { useCategoryStore } from '@/store/modules/categoryStore'
const cateStore = useCategoryStore()

const { categoryList } = storeToRefs(cateStore)

const searchText = ref('')
</script>

<template>
    <header class='app-header'>
        <div class="container">
            <h1 class="logo">
                <RouterLink to="/">小兔鲜</RouterLink>
            </h1>
            <ul class="app-header-nav">
                <li class="home">
                    <RouterLink  to="/">首页</RouterLink>
                </li>
                <li class="home" v-for="item in categoryList" :key="item.id">
                    <RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
                </li>
            </ul>
            <div class="search">
               <el-input
                v-model="searchText"
                size="large"
                placeholder="搜一搜"
                :prefix-icon="Search"
                />
            </div>
            <!-- 头部购物车 -->
            <!-- <HeaderCart/> -->
        </div>
    </header>
</template>


<style scoped lang='scss'>
.app-header {
    background: #fff;

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
        }
    }

    .app-header-nav {
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

    .search {
        margin-left: auto;;
        height: 32px;
        position: relative;
        line-height: 32px;
        :deep(.el-input){
             width: 240px;
        }
    }

    .cart {
        width: 50px;

        .curr {
            height: 32px;
            line-height: 32px;
            text-align: center;
            position: relative;
            display: block;

            .icon-cart {
                font-size: 22px;
            }

            em {
                font-style: normal;
                position: absolute;
                right: 0;
                top: 0;
                padding: 1px 6px;
                line-height: 1;
                background: $helpColor;
                color: #fff;
                font-size: 12px;
                border-radius: 10px;
                font-family: Arial;
            }
        }
    }
}
</style>
