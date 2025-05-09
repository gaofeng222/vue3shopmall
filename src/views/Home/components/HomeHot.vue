<template>
    <home-panel title="人气推荐" sub-title="人气爆款 不容错过">
        <!-- 下面是插槽主体内容模版 -->
        <ul class="goods-list">
            <li v-for="item in hotList" :key="item.id">
                <router-link to="/">
                    <img  v-lazy-img="item.picture" :alt="item.alt" />
                    <p class="name">{{ item.title }}</p>
                     <p class="desc">{{ item.alt }}</p>
                </router-link>
            </li>
        </ul>
    </home-panel>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomePanel from './HomePanel.vue'
import { getHotLists } from '@/apis/category'

const hotList = ref([])

onMounted(async () => {
    const res = await getHotLists()
    hotList.value = res.result
})

</script>

<style lang="scss" scoped>
.goods-list{
  display: flex;
  justify-content: space-between;
  li{
    width: 306px;
    background: #f0f9f4;
    transition: all .5s;
    &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    a {
      img{
         width: 306px;
         height: 306px;
      }
      p {
            padding-top: 12px ;
            font-size: 18px;
            text-align: center;
        }

        .desc {
            color: $sucColor;
            padding-bottom: 12px ;
        }
    }
  }
}
</style>