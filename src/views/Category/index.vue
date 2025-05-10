<template>
    <div class="category-main">
        <div class="container mt20">
            <gf-breadCrumb :path="path" :key="route.params.id"/>
        </div>
    </div>
</template> 
<script setup>
import {ref,onMounted, watch} from 'vue'
import {useRoute} from 'vue-router'
import {categoryLists} from '@/apis/category'
import GfBreadCrumb from '@c/gf-breadcrumb.vue'
const route = useRoute()
const categoryListsData = ref([])
const path = ref('')

onMounted( ()=>{
     getCategoryLists()
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


</script>


<style lang="scss" scoped>
.category-main{

}
</style>