<template>
    <div class="category-main">
        <div class="container mt20">
            <gf-breadCrumb :path="path" :key="route.params.id"/>
        </div>
        <!-- Banner 轮播图 -->
         <div class="home-banner">
            <el-carousel height="500px">
               <el-carousel-item v-for="item in bannerLists" :key="item.id">
                  <img :src="item.imgUrl" alt="">
               </el-carousel-item>
            </el-carousel>
         </div>
    </div>
</template> 
<script setup>
import {ref,onMounted, watch} from 'vue'
import {useRoute} from 'vue-router'
import {categoryLists} from '@/apis/category'
import GfBreadCrumb from '@c/gf-breadcrumb.vue'
import {getBannerLists} from '@/apis'

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

watch(()=>route.params,()=>{
    console.log('90900')
    getCategoryLists()
})

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
  }
}
</style>