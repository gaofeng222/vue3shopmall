<template>
  <el-popover placement="bottom" :width="400">
    <template #default>
      <div class="layer" v-if="cartStore.cartList.length">
        <div class="list">
          <div class="item" v-for="i in cartStore.cartList" :key="i">
            <router-link to="">
              <img :src="i.picture" alt="" />
              <div class="center">
                <p class="name ellipsis-2">
                  {{ i.name }}
                </p>
                <p class="attr ellipsis">{{ i.attrsText }}</p>
              </div>
              <div class="right">
                <p class="price">&yen;{{ i.price }}</p>
                <p class="count">x{{ i.count }}</p>
              </div>
            </router-link>
            <i
              class="iconfont icon-close-new"
              @click="cartStore.delCart(i.skuId)"
            ></i>
          </div>
        </div>
        <div class="foot">
          <div class="total">
            <p>共 {{ cartStore.allCount }} 件商品</p>
            <p>&yen; {{ cartStore.allPrice }}</p>
          </div>
          <el-button
            size="large"
            type="primary"
            @click="$router.push('/cartlist')"
            >去购物车结算</el-button
          >
        </div>
      </div>
      <el-empty v-else description="您的购物车空空如也~~"/>
    </template>
    <template #reference>
      <el-badge class="shop-cart-btn" :value="cartStore.allCount" :max="99">
        <el-icon size="24"><ShoppingCartFull /></el-icon>
      </el-badge>
    </template>
  </el-popover>
</template>

<script setup>
import { ShoppingCartFull } from "@element-plus/icons-vue";

import { useCartStore } from '@s/cartStore'
const cartStore = useCartStore()
</script>

<style lang="scss" scoped>
.shop-cart-btn {
  cursor: pointer;
  margin-left: 20px;
}
.layer {   
        width: 100%;
        height: 400px;
        padding-top: 10px;
        overflow: hidden;
        .list {
          height: 310px;
          overflow: auto;
          .item {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px 0;
            position: relative;
            display: flex;
            i {
                position: absolute;
                bottom: 38px;
                right: 4px;
                opacity: 0;
                color: #666;
                transition: all 0.5s;
            }
            &:hover {
                i {
                    opacity: 1;
                    cursor: pointer;
                }
            }
            a {
                display: flex;
                align-items: center;
                flex:1;
                box-sizing: border-box;
                img {
                    height: 80px;
                    width: 80px;
                }

                .center {
                    padding: 0 10px;
                    width: 150px;
                    .name {
                        font-size: 16px;
                    }
                    .attr {
                        color: #999;
                        padding-top: 5px;
                    }
                }
                .right {
                    width: 80px;
                    padding-right: 20px;
                    text-align: center;
                    .price {
                        font-size: 16px;
                        color: $priceColor;
                    }

                    .count {
                        color: #999;
                        margin-top: 5px;
                        font-size: 16px;
                    }
                }
            }
          }
        }
        .foot {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 70px;
            width: 100%;
            padding: 10px;
            display: flex;
            box-sizing: border-box;
            justify-content: space-between;
            background: #f8f8f8;
            align-items: center;

            .total {
                color: #999;
                p {
                    &:last-child {
                        font-size: 18px;
                        color: $priceColor;
                    }
                }
            }
        }
}
</style>
