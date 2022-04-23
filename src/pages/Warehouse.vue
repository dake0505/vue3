<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { createWarehouseCommodity, queryWarehouseCommodityList, updateWarehouseCommodity, deleteWarehouseCommodity } from "../api/warehouse"
import { ElMessage } from 'element-plus';
import type { FormInstance } from 'element-plus';
 
const commodityDialog = ref(false)
const commodityList = ref([])
const commodityCount = ref(0)
const dialogType = ref('create')
const commodityFilter = reactive({
  pageNumber: 1,
  pageSize: 10
})
let commodityForm = ref({
  commodityName: '',
  commodityDisplayName: '',
  commodityDesc: '',
  commodityPrice: 0,
  commodityCount: 0,
  commoditySale: 1,
  isValid: true
})
const commodityFormRef = ref<FormInstance>(null)

const onUpdateCommodityDialog = (status: boolean, type: string='create', form: object = {}):void => {
  if (!status) {
    commodityFormRef.value.resetFields()
  }
  commodityDialog.value = status
  dialogType.value = type
  if (type === 'update') {
    commodityForm.value = JSON.parse(JSON.stringify(form))
    console.log(commodityForm, form)
  }
}

const onSubmit = () => {
  if (dialogType.value === 'create') {
    onCreateCommodity()
  } else {
    onUpdateCommodity()
  }
}


const onPageChange = (page) => {
  commodityFilter.pageNumber = page
  onQueryCommodityList()
}

const onQueryCommodityList = async () => {
  const res = await queryWarehouseCommodityList(commodityFilter)
  commodityList.value = res.data.data.list
  commodityCount.value = res.data.data.count
}

const onCreateCommodity = async () => {
  const res = await createWarehouseCommodity(commodityForm.value)
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

const onUpdateCommodity = async () => {
  const res = await updateWarehouseCommodity(commodityForm.value)
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

const onDeleteCommodity = async (id) => {
  const res = await deleteWarehouseCommodity({ id })
  console.log(res)
  if (res.data.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    onQueryCommodityList()
  }
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
    <el-form :model="commodityForm" ref="commodityFormRef">
      <el-form-item label="商品名称" prop="commodityName">
        <el-input v-model="commodityForm.commodityName" />
      </el-form-item>
      <el-form-item label="展示名称" prop="commodityDisplayName">
        <el-input v-model="commodityForm.commodityDisplayName" />
      </el-form-item>
      <el-form-item label="商品描述" prop="commodityDesc">
        <el-input v-model="commodityForm.commodityDesc" />
      </el-form-item>
      <el-form-item label="商品价格" prop="commodityPrice">
        <el-input-number v-model="commodityForm.commodityPrice" />
      </el-form-item>
      <el-form-item label="商品数量" prop="commodityCount">
        <el-input-number v-model="commodityForm.commodityCount" />
      </el-form-item>
      <el-form-item label="商品折扣" prop="commoditySale">
        <el-input-number v-model="commodityForm.commoditySale" />
      </el-form-item>
      <el-form-item label="是否有效" prop="isValid">
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
      <template #default="scope">
        <el-button type="text" size="small" @click="onUpdateCommodityDialog(true, 'update', scope.row)">Detail</el-button>
        <el-button type="text" size="small" @click="onDeleteCommodity(scope.row._id)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model="commodityFilter.pageNumber"
    class="commodity-page"
    background layout="prev, pager, next"
    :total="commodityCount"
    @current-change="onPageChange"  
  />
</template>

<style lang="less" scoped>
.commodity-page {
  margin-top: 15px;
}
</style>