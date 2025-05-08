<script setup>
import Edit from './components/Edit.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import  {userState} from '@/store/modules/userStore'
import { storeToRefs } from 'pinia'
//
const store = userState()
const { loading,dataList } = storeToRefs(store)
const {fetchData} = store

// const { getDataList, dataList, loading } = store

// TODO:列表渲染
onMounted(() => fetchData())

// TODO:删除功能

const onDelete = async (id) => {
  await axios.delete(`/del/${id}`)
  getList()
}

// TODO:编辑功能
const editRef = ref(null)
const openDialog = (item) => {
  editRef.value.open(item)
}

// 更新列表
const updateList = () => {
  fetchData()
}


onMounted(() => {
  axios.post("/userInfo",{
     name:"张三",
      age:20,
      sex:'男',
      hobby:['篮球','足球']
  }).then(res => {
    console.log(res)
  })
})








</script>

<template>
  <div class="app">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name" width="150"></el-table-column>
      <el-table-column label="籍贯" prop="place"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button type="primary" link @click="openDialog(row)">编辑</el-button>
          <el-button type="danger" link @click="onDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Edit ref="editRef" @update-list="updateList" />
</template>

<style scoped>
.app {
  width: 980px;
  margin: 100px auto 0;
}
</style>
