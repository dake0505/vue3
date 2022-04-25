<script lang="ts" setup>
import { Ref, ref, reactive, onMounted } from 'vue';
import { PriceTag } from '@element-plus/icons-vue'
import { queryShopCommodityList } from '@/api/shop'

interface CommodityItem {
  commodityDisplayName: string,
  commodityPrice: number
}
const commodityList: Ref<Array<CommodityItem>> = ref([])
const commodityCount = ref(null)
const commodityFilter = reactive({
  pageNumber: 1,
  pageSize: 8
})
const onPageChange = (page: any) => {
  commodityFilter.pageNumber = page
  onQueryCommodityList()
}


const onQueryCommodityList = async () => {
  const res = await queryShopCommodityList(commodityFilter)
  commodityList.value = res.data.data.list
  commodityCount.value = res.data.data.count
}

onMounted(() => {
  onQueryCommodityList()
})
</script>

<template>
  <div class="commodity-filter">
    home list
  </div>
  <div class="commodity-box">
    <el-card v-for="(item, index) in commodityList" :key="index" class="commodity-item" :body-style="{ padding: '0px' }">
      <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="image"
      />
      <div class="commodity-info">
        <p class="title">
          <span>{{ item.commodityDisplayName }}</span>
        </p>
        <p class="price">
          <el-icon><price-tag /></el-icon>
          <span>{{ item.commodityPrice }}</span>
          <span>RMB</span>
        </p>
      </div>
    </el-card>
  </div>
  <div class="commodity-page">
    <el-pagination
      v-model="commodityFilter.pageNumber"
      background
      layout="total, prev, pager, next"
      :total="commodityCount"
      @current-change="onPageChange"  
    />
  </div>
</template>

<style lang="less" scoped>
.commodity-filter {
  height: 100px;
}
.commodity-box {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  .commodity-item {
    width: 20%;
    height: 0;
    margin: 15px 25px;
    padding: 0;
    padding-bottom: 28%;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
    }
    .commodity-info {
      p {
        margin: 0;
      }
      .title {
        font-weight: bold;
        text-align: left;
        padding-left: 10px;
        font-size: 16px;
      }
      .price {
        margin-top: 10px;
        text-align: left;
        padding-left: 10px;
        display: flex;
        align-items: center;
        span {
          margin: 0 10px;
        }
      }
    }
  }
  .commodity-item:hover {
    transform: scale(1.1);
  }
}

.commodity-page {
  width: 90%;
  display: flex;
  flex-direction: row-reverse;
  margin: 20px auto;
}
</style>