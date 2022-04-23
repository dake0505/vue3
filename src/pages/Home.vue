<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { queryWarehouseCommodityList } from '@/api/warehouse';
import { PriceTag } from '@element-plus/icons-vue'
const commodityList = ref([])
const commodityCount = ref(null)
const commodityFilter = reactive({
  pageNumber: 1,
  pageSize: 10
})


const onQueryCommodityList = async () => {
  const res = await queryWarehouseCommodityList(commodityFilter)
  commodityList.value = res.data.data.list
  commodityCount.value = res.data.data.count
}

onMounted(() => {
  onQueryCommodityList()
})
</script>

<template>
  <div class="commodity-box">
    <el-card v-for="(item, index) in commodityList" :key="index" class="commodity-item" :body-style="{ padding: '0px' }">
      <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="image"
      />
      <div class="commodity-info">
        <p class="title">
          <span>{{ item?.commodityDisplayName }}</span>
        </p>
        <p class="price">
          <el-icon><price-tag /></el-icon>
          <span>{{ item?.commodityPrice }}</span>
          <span>RMB</span>
        </p>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.commodity-box {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  .commodity-item {
    width: 300px;
    height: 400px;
    margin: 15px 25px;
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
</style>