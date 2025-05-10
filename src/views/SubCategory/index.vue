<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
             <gf-breadCrumb :path="menuInfoData" />
        </div>
        <div class="sub-container">
            <el-tabs v-model="queryData.sortField" @tab-change="tabChange">
                <el-tab-pane v-for="item in tabLists" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
            </el-tabs>
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <GoodsItem v-for="good in goodList" :good="good" :key="good.id" />
            </div>
        </div> 
    </div>
</template>

<script setup>
import {useRoute} from 'vue-router'
const route = useRoute()
import {categoryLists2,getSubCategoryFilter} from '@/apis/category'
import { onMounted, reactive, ref } from 'vue'
import GfBreadCrumb from '@c/gf-breadcrumb.vue'
import GoodsItem from '@v/Home/components/GoodsItem'
const menuInfoData = ref([])

const queryData = reactive({
   categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})
const goodList = ref([])
const disabled = ref(false)
onMounted(async ()=>{
    const {id} = route.params
    const res = await categoryLists2({id})
    // 拼接面包屑导航路由
    menuInfoData.value = [{
      name:res.result.parentName,
      path:`/category/${res.result.parentId}`
    },{
      name:res.result.name,
    }]
    getSubCategoryList()
})

const getSubCategoryList = async ()=>{
    const res = await getSubCategoryFilter(queryData)
    goodList.value = [...goodList.value,...res.result.items]
}


const tabLists = [{
    label:'最新商品',
    name:'publishTime'
},{
    label:'最高人气',
    name:'orderNum'
},{
    label:'评论最多',
    name:'evaluateNum'
}]


const tabChange = (val)=>{
    console.log("🚀 ~ tabChange ~ val:", val)
    queryData.sortField = val
    getSubCategoryList()

}

const load = async ()=>{
  queryData.page++
  getSubCategoryList()

   if (!res.result.items.length) {
        disabled = true
    }
}
</script>


<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;   
}
.body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    justify-content: center;
}

</style>
