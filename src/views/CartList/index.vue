<template>
  <div class="cartlist-main" >
      <el-table :data="tableData" header-align="center" row-class-name="cart-row-list">
        <el-table-column type="selection" width="55" />
        <el-table-column property="cover" label="商品图片"  align="center">
          <template #default="scope">
             <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.picture"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="[scope.row.picture]"
                show-progress
                preview-teleported
                fit="cover"
              />
          </template>
        </el-table-column>
        <el-table-column property="name" label="商品信息"  align="center" show-overflow-tooltip/>
        <el-table-column property="price" label="单价"  align="center"/>
        <el-table-column property="count" label="数量"  align="center">
          <template #default="scope">
            <el-input-number v-model="scope.row.count" />
          </template>
        </el-table-column>
        <el-table-column property="total" label="小计"  align="center">
           <template #default="scope">
            {{ scope.row.price * scope.row.count }}元
          </template>
        </el-table-column>
        <el-table-column property="action" label="操作" align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from '@s/cartStore'
const cartStore = useCartStore()
const tableData = cartStore.cartList
const handleDelete = (index, row) => {}
const handleEdit = (index, row) => {}
</script>


<style lang="scss" scoped>
.cartlist-main{
  background: #fff;
  
  .el-table{
    padding: 20px 0;
    width: 1240px;
    margin: 20px auto 0;
  }
 
}
</style>
  
<style lang="scss">
// 自定义class不能放在scoped中，否则无效。
// 或者使用/deep/穿透
 .cart-row-list{
     padding: 10px 0;
     height: 120px;
  }
</style>