<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { createWarehouseCommodity, queryWarehouseCommodityList } from "@/api/warehouse"
import { ElMessage } from 'element-plus';
 
const commodityDialog = ref(false)
const commodityList = ref([])
const onUpdateCommodityDialog = (status: boolean):void => {
  commodityDialog.value = status
}
const commodityForm = reactive({
  commodityName: '',
  commodityDisplayName: '',
  commodityDesc: '',
  commodityPrice: 0,
  commodityCount: 0,
  commoditySale: 1,
  isValid: true
})

const onSubmit = async () => {
  const res = await createWarehouseCommodity(commodityForm)
  console.log(res)
  if (res.data.code === 200) {
    ElMessage({
      type: 'success',
      message: '提交成功'
    })
    onUpdateCommodityDialog(false)
    onQueryCommodityList()
  }
}

const onQueryCommodityList = async () => {
  const res = await queryWarehouseCommodityList()
  commodityList.value = res.data.data.list
}

onMounted(() => {
  onQueryCommodityList()
})

</script>

<template>
  <el-button @click="onUpdateCommodityDialog(true)">新增商品</el-button>
  <el-dialog
    v-model="commodityDialog"
    title="商品详情"
    :before-close="() => onUpdateCommodityDialog(false)"
  >
    <el-form :model="commodityForm">
      <el-form-item label="商品名称">
        <el-input v-model="commodityForm.commodityName" />
      </el-form-item>
      <el-form-item label="展示名称">
        <el-input v-model="commodityForm.commodityDisplayName" />
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="commodityForm.commodityDesc" />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number v-model="commodityForm.commodityPrice" />
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input-number v-model="commodityForm.commodityCount" />
      </el-form-item>
      <el-form-item label="商品折扣">
        <el-input-number v-model="commodityForm.commoditySale" />
      </el-form-item>
      <el-form-item label="是否有效">
        <el-switch v-model="commodityForm.isValid" />
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="onSubmit">提交</el-button>
    </div>
  </el-dialog>
  <el-table :data="commodityList" style="width: 100%">
    <el-table-column prop="_id" label="_id" width="250" />
    <el-table-column prop="commodityName" label="名称" width="180" />
    <el-table-column prop="commodityDisplayName" label="展示名称" width="180" />
    <el-table-column prop="commodityDesc" label="描述" />
    <el-table-column prop="commodityPrice" label="价格" width="80" />
    <el-table-column prop="commoditySale" label="折扣" width="80" />
    <el-table-column prop="isValid" label="是否有效" width="80" />
    <el-table-column label="Operations" width="120">
      <template #default>
        <el-button type="text" size="small">Detail</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>