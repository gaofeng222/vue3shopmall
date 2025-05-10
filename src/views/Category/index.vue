<template>
    <div class="category-main">
        <div class="container mt20">
            <gf-breadCrumb :path="path" />
        
        <!-- Banner 轮播图 -->
         <div class="home-banner">
            <el-carousel height="500px" v-if="bannerLists.length">
               <el-carousel-item v-for="item in bannerLists" :key="item.id">
                  <img v-lazy-img="item.imgUrl" alt="">
               </el-carousel-item>
            </el-carousel>
            <div  class="default-show" v-else>
                <img :src="loading" />
                <img />
            </div>
         </div>
         <!-- 分类数据 -->
         <div class="sub-list">
            <h3>全部分类</h3>
            <ul>
               <li v-for="i in categoryListsData.children" :key="i.id">
                  <RouterLink :to="`/category/sub/${i.id}`">
                     <img v-lazy-img="i.picture" />
                     <p>{{ i.name }}</p>
                  </RouterLink>
               </li>
            </ul>
         </div>
         <div class="ref-goods" v-for="item in categoryListsData.children" :key="item.id">
            <div class="head">
               <h3>- {{ item.name }}-</h3>
            </div>
            <div class="body">
               <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
            </div>
         </div>
         </div>
    </div>
</template> 
<script setup>
import {ref,onMounted, watch} from 'vue'
import {useRoute} from 'vue-router'
import {categoryLists} from '@/apis/category'
import GfBreadCrumb from '@c/gf-breadcrumb.vue'
import {getBannerLists} from '@/apis'
import GoodsItem from '@v/Home/components/GoodsItem'
import loading from "@a/images/loading.gif";

const route = useRoute()
const categoryListsData = ref([])
const path = ref('')

onMounted( ()=>{
     getCategoryLists()
     getBanner()
})


async function getCategoryLists(){
    const { id } = route.params
    const res = await categoryLists({id})
     categoryListsData.value = res.result
     path.value = res.result.name
}

const bannerLists = ref([])
async function getBanner(){
    const res = await getBannerLists({
        distributionSite:'2'
    })
    bannerLists.value = res.result
}


</script>


<style lang="scss" scoped>
.category-main{
  .home-banner{
    width: 1240px;
    margin: 0 auto;
    margin-top: 20px;
    img{
      width: 100%;
      height: 100%;
    }
    .default-show{
        height:500px;
        position: relative;
        img:first-child{
            width: 100px;
            height: 100px;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate3d(-50%,-50%,0);
            background: none;
        }
    }
  }
  .sub-list{
     margin-top: 20px;
     background-color: #fff;
     h3 {
            font-size: 28px;
            color: #666;
            font-weight: normal;
            text-align: center;
            line-height: 100px;
        }
     ul{
         display: flex;
         padding: 0 32px;
         flex-wrap: wrap;
        li{
           width:168px;
           height: 168px;
           a{
             text-align: center;
               display: block;
               font-size: 16px;
            img{
                width: 100px;
                height: 100px;
            }
            p {
                  line-height: 40px;
                  font-size: 14px;
               }

            &:hover {
                color: $xtxColor;
            }
           }
        }
     }
  }
  .ref-goods{
      background-color: #fff;
      margin-top: 20px;
      position: relative;
       .head { 
            h3{
                text-align: center;
                font-size: 26px;
                font-weight: 500;
                color: #666;
                padding:  20px 0;
            }

      }
      .body {
         display: flex;
         padding: 0 40px 30px;
         flex-wrap: wrap;
         .goods-item{
         }
      }
  }
}
</style>