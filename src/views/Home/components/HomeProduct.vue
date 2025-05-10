<template>
   <div class="home-product">
       <home-panel v-for="item in goodsList" :key="item.id" :title="item.name">
        <div class="box">
            <router-link class="cover">
                <img v-lazy-img="item.picture">
                <strong class="label">
                   <span> {{ item.name }}</span>
                   <span> {{ item.saleInfo }}</span>
                </strong>
            </router-link>
            <ul class="goods-list">
                <li  v-for="goods in item.goods" :key="goods.id">
                    <goods-items :good="goods" />
                </li>
            </ul>
        </div>
       </home-panel>
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomePanel from './HomePanel.vue'
import { getGoodsLists } from '@/apis/category'
import GoodsItems from './GoodsItem'

const goodsList = ref([])

onMounted(async () => {
    const res = await getGoodsLists()
    console.log("🚀 ~ onMounted ~ res:", res)
    // 
    goodsList.value = res.result
})
</script>

<style lang="scss" scoped>
.home-product{
    background: #fff;
    margin-top: 20px;
    .box {
        display: flex;
        .cover{
            width: 240px;
            height: 610px;
            margin-right: 10px;
            position: relative;
            flex-shrink: 0;
            img {
                width: 100%;
                height: 100%;
            }
            .label {
                width: 188px;
                height: 66px;
                display: flex;
                font-size: 18px;
                color: #fff;
                line-height: 66px;
                font-weight: normal;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate3d(0, -50%, 0);

                span {
                    text-align: center;

                    &:first-child {
                        width: 76px;
                        background: rgba(0, 0, 0, 0.9);
                    }

                    &:last-child {
                        flex: 1;
                        background: rgba(0, 0, 0, 0.7);
                    }
                }
            }
        }
        .goods-list{
            display: flex;
            flex-wrap: wrap;
            li {
                width: 240px;
                height: 300px;
                margin-right: 10px;
                margin-bottom: 10px;

                &:nth-last-child(-n + 4) {
                    /* margin-bottom: 0; */
                }

                &:nth-child(4n) {
                    margin-right: 0;
                }
            }
        }
    }
    
}
</style>