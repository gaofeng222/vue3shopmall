<template>
 
    <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <TransitionGroup  name="fade" appear>
          <el-breadcrumb-item v-for="(item,index) in menuLists" :key="index">
            <a v-if="item.path" :href="item.path">{{item.name}}</a>
            <span class="grey" v-else>{{item.name}}</span>
          </el-breadcrumb-item>
         </TransitionGroup >
    </el-breadcrumb>
 
</template>

<script setup>
import {ArrowRight} from '@element-plus/icons-vue'
import { computed } from 'vue'
const props = defineProps({
  path:{
    type:[Array,String],
    default:()=>[]
  }
})

const menuLists = computed(() => {
  if(!props.path) return ''
  if(typeof props.path === 'string'){
    console.log(props.path)
    return [{name:props.path}]
  } else if(Array.isArray(props.path)) {
    return props.path.map((item) => ({ name: item.meta.title, path: item.path }))
  }
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>