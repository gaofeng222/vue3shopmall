<template>
    <div class="home-category">
        <ul class="menu">
            <li v-for="item in categoryList" :key="item.id">
                <router-link :to="`/category/${item.id}`">{{item.name}}</router-link>
                <router-link to="/" v-for="_ in item.children.slice(0,2)" :key="_.id">
                    {{_.name}}
                </router-link>

                <div class="layer">
                    <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
                    <ul>
                        <li v-for="i in item.goods" :key="i.id">
                            <router-link :to="`/detail/${i.id}`">
                                <img :src="i.picture" alt="" />
                                <div class="info">
                                    <p class="name ellipsis-2">
                                        {{i.name}}
                                    </p>
                                    <p class="desc ellipsis">{{ i.desc }}</p>
                                    <p class="price"><i>¥</i>{{i.price}}</p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/store/modules/categoryStore'
const cateStore = useCategoryStore()

const { categoryList } = storeToRefs(cateStore)
</script>

<style lang="scss" scoped>
.home-category {
    width: 250px;
    height: 500px;
    background: rgba(0, 0, 0, 0.8);
    position: relative;
    z-index: 99;
    .menu {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        > li {
            padding-left: 40px;
            display: flex;
            align-items: center;
            flex:1;
            cursor: pointer;
            &:hover {
                background: $xtxColor;
            }

            > a {
                margin-right: 4px;
                color: #fff;

                &:first-child {
                    font-size: 16px;
                }
            }

            .layer{
                width: 990px;
                height: 500px;
                position: absolute;
                left: 250px;
                top: 0;
                display: none;
                padding: 0 15px;
                background: #fff;

                h4{
                    font-size: 20px;
                    font-weight: normal;
                    line-height: 80px;

                    small {
                        font-size: 16px;
                        color: #666;
                    }
                }

                ul{
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        width: 310px;
                        /* height: 120px; */
                        margin-right: 15px;
                        margin-bottom: 15px;
                        border: 1px solid #eee;
                        border-radius: 4px;
                        background: #fff;

                        a{
                            display: flex;
                            /* width: 100%; */
                            align-items: center;
                            padding: 10px;
                            font-size: 0;
                            &:hover {
                                background: #e3f9f4;
                            }
                            img{
                                width:95px;
                                height: 95px;
                                
                            }
                            .info{
                                padding-left: 10px;
                                line-height: 24px;
                                overflow: hidden;
                                .name {
                                    font-size: 16px;
                                    color: #666;
                                }

                                .desc {
                                    color: #999;
                                }
                                .price {
                                    font-size: 22px;
                                    color: $priceColor;

                                    i {
                                        font-size: 16px;
                                    }
                                }

                            }
                        }
                    }
                }

            }
            &:hover .layer{
                display: block;
            }

        }
    }
}
</style>