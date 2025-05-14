<template>
  <div class="pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <el-card header="收货地址" shadow="hover">
          <div class="box-body">
            <div class="address">
              <div class="text">
                <div class="none" v-if="!curAddress">
                  您需要先添加收货地址才可提交订单。
                </div>
                <ul v-else>
                  <li>
                    <span>收<i />货<i />人：</span>{{ curAddress.receiver }}
                  </li>
                  <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                  <li>
                    <span>收货地址：</span>{{ curAddress.fullLocation }}
                    {{ curAddress.address }}
                  </li>
                </ul>
              </div>
              <div class="action">
                <el-button size="large" @click="showDialog = true"
                  >切换地址</el-button
                >
                <el-button size="large" @click="addFlag = true"
                  >添加地址</el-button
                >
              </div>
            </div>
          </div>
        </el-card>

        <!-- 商品信息 -->
        <el-card header="商品信息" shadow="hover">
          <el-table :data="goods" style="width: 100%">
            <el-table-column property="cover" label="商品图片" align="center">
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
            <el-table-column
              property="name"
              label="商品信息"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column property="price" label="单价" align="center" />
            <el-table-column property="count" label="数量" align="center">
              <template #default="scope">
                 <span>{{scope.row.count}}</span>
              </template>
            </el-table-column>
            <el-table-column property="total" label="小计" align="center">
              <template #default="scope">
                {{ scope.row.price * scope.row.count }}元
              </template>
            </el-table-column>
            <template key="" #empty>
              <div class="cart-none">
                <el-empty description="商品为空"></el-empty>
              </div>
            </template>
          </el-table>
        </el-card>

        <!-- 配送时间 -->
        <el-card header="配送时间" shadow="hover">
          <div class="box-body">
            <a class="my-btn active" href="javascript:;"
              >不限送货时间：周一至周日</a
            >
            <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
            <a class="my-btn" href="javascript:;"
              >双休日、假日送货：周六至周日</a
            >
          </div>
        </el-card>

        <!-- 支付方式 -->
        <el-card header="支付方式" shadow="hover">
          <div class="box-body">
            <a class="my-btn active" href="javascript:;">在线支付</a>
            <a class="my-btn" href="javascript:;">货到付款</a>
            <span style="color: #999">货到付款需付5元手续费</span>
          </div>
        </el-card>
        <!-- 金额明细 -->
        <el-card header="金额明细" shadow="hover">
          <div class="box-body">
            <div class="total">
              <dl>
                <dt>商品件数：</dt>
                <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
              </dl>
              <dl>
                <dt>商品总价：</dt>
                <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
              </dl>
              <dl>
                <dt>运<i></i>费：</dt>
                <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
              </dl>
              <dl>
                <dt>应付总额：</dt>
                <dd class="price">
                  {{ checkInfo.summary?.totalPayPrice.toFixed(2) }}
                </dd>
              </dl>
            </div>
          </div>
        </el-card>

        <!-- 提交订单 -->
        <div class="submit">
          <el-button @click="createOrder" type="primary" size="large"
            >提交订单</el-button
          >
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="40%" center>
    <div class="addressWrapper">
      <div
        class="text item"
        :class="{ active: item.id === activeAddress.id }"
        @click="switchAddress(item)"
        v-for="item in checkInfo.userAddresses"
        :key="item.id"
      >
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ item.receiver }}
          </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button  @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getCheckInfo,submitOrder } from "@/apis/order";
import { useCartStore } from '@s/cartStore'
import { useRouter } from 'vue-router'
const curAddress = ref(null);
const checkInfo = ref([]);
const activeAddress = ref({});
const showDialog = ref(false);
const goods = ref([]);

const cartStore = useCartStore()
const router = useRouter()

onMounted(() => {
  getCheckInfoData();
});

const getCheckInfoData = async () => {
  const res = await getCheckInfo();
  checkInfo.value = res.result;
  const address = res.result.userAddresses.find((item) => item.isDefault === 0);
  if (address) {
    curAddress.value = address;
  }
  goods.value = res.result.goods;
};

const addFlag = ref(false);
// 创建订单
const createOrder = async () => {
  const res = await submitOrder({
      deliveryTimeType: 1,
      payType: 1,
      payChannel: 1,
      buyerMessage: '',
      goods: checkInfo.value.goods.map(item => {
        return {
          skuId: item.skuId,
          count: item.count
        }
      }),
      addressId: curAddress.value.id
    })
  const orderId = res.result.id

  router.push({
    path: '/pay',
    query: {
      id: orderId
    }
  })
  // 更新购物车
  cartStore.updateNewList()
};
const switchAddress = (item) => {
  activeAddress.value = item;
};
//覆盖地址
const handleConfirm = () => {
  curAddress.value = activeAddress.value;
  showDialog.value = false;
};
</script>

<style scoped lang="scss">
.pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    /* background: #fff; */
    display: flex;
    flex-direction: column;
    gap: 20px 0;

    .box-body {
      padding: 20px 0;
    }
    .address {
      border: 1px solid #f5f5f5;
      display: flex;
      align-items: center;

      .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;

        .none {
          line-height: 90px;
          color: #999;
          text-align: center;
          width: 100%;
        }

        > ul {
          flex: 1;
          padding: 20px;

          li {
            line-height: 30px;

            span {
              color: #999;
              margin-right: 5px;

              > i {
                width: 0.5em;
                display: inline-block;
              }
            }
          }
        }

        > a {
          color: $xtxColor;
          width: 160px;
          text-align: center;
          height: 90px;
          line-height: 90px;
          border-right: 1px solid #f5f5f5;
        }
      }

      .action {
        width: 420px;
        text-align: center;

        .btn {
          width: 140px;
          height: 46px;
          line-height: 44px;
          font-size: 14px;

          &:first-child {
            margin-right: 10px;
          }
        }
      }
    }
    .total {
      dl {
        display: flex;
        justify-content: flex-end;
        line-height: 50px;

        dt {
          i {
            display: inline-block;
            width: 2em;
          }
        }

        dd {
          width: 240px;
          text-align: right;
          padding-right: 70px;

          &.price {
            font-size: 20px;
            color: $priceColor;
          }
        }
      }
    }
    .submit {
      text-align: right;
      padding: 60px;
      border-top: 1px solid #f5f5f5;
    }
    .my-btn {
      width: 228px;
      height: 50px;
      border: 1px solid #e4e4e4;
      text-align: center;
      line-height: 48px;
      margin-right: 25px;
      color: #666666;
      display: inline-block;

      &.active,
      &:hover {
        border-color: $xtxColor;
      }
    }
  }
}
.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
  .text {
    min-height: 90px;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;

      &.active,
      &:hover {
        border-color: $xtxColor;
        background: lighten($xtxColor, 50%);
      }

      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
