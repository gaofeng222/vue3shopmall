<template>
    <div class="home-banner">
        <el-carousel height="500px" autoplay>
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getBannerLists } from "@/apis/index";

const bannerList = ref([])

onMounted(async () => {
    const res = await getBannerLists()
    bannerList.value = res.result

})

</script>

<style lang="scss" scoped>
.home-banner{
    flex:1;
    .el-carousel__item {
      width: 100%;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
      }
    }
}
</style>