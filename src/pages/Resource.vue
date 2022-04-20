<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue' 
import { queryResourceList, createResource, updateResource } from "@/api/resource";
import { ElMessage } from 'element-plus'

const resourceList = ref([])
const handleClick = ():void => {}
const onQueryResourceList = async () => {
  const res = await queryResourceList({ limit: 20, offset: 0 })
  resourceList.value = res.data.resourceList
}

const resourceDialog = ref(false)
const onCreateResource = () => {
  resourceDialog.value = true
}
const onCloseResourceDialog = () => {
  resourceDialog.value = false
}

const resourceForm = reactive({
  title: '',
  description: '',
  tagList: []
})
const onSubmitResource = async () => {
  try {
    const res = await createResource(resourceForm)
    console.log(res)
    ElMessage({
      message: '创建成功',
      type: 'success'
    })
    onCloseResourceDialog()
    onQueryResourceList()
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  onQueryResourceList()
})
</script>


<template>
  <el-button @click="onCreateResource">创建资源</el-button>
  <el-table :data="resourceList" style="width: 100%">
    <el-table-column prop="_id" label="_id" width="250" />
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="description" label="描述" />
    <el-table-column prop="tagList" label="标签">
      <template #default="scope">
        <el-tag v-for="(item, index) in scope.row.tagList" :key="index" style="margin:0 2px;">{{ item }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="createdAt" label="创建时间">
      <template #default="scope">{{ scope.row.createdAt.slice(0, 10) }}</template>
    </el-table-column>
    <el-table-column prop="updatedAt" label="更新时间">
      <template #default="scope">{{ scope.row.updatedAt.slice(0, 10) }}</template>
    </el-table-column>
    <el-table-column label="Operations" width="120">
      <template #default>
        <el-button type="text" size="small" @click="handleClick">Detail</el-button>
        <el-button type="text" size="small">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="resourceDialog"
    title="资源详情"
    width="30%"
    :before-close="onCloseResourceDialog"
  >
    <el-form
      ref="resourceFormRef"
      :model="resourceForm"
      label-width="120px"
    >
      <el-form-item label="标题">
        <el-input v-model="resourceForm.title" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="resourceForm.description" />
      </el-form-item>
      <el-form-item label="标签">
        <el-select
          v-model="resourceForm.tagList"
          multiple
          placeholder="Select"
          style="width: 240px"
        >
          <el-option label="vue" value="vue"/>
          <el-option label="react" value="react"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resourceDialog = false">Cancel</el-button>
        <el-button type="primary" @click="onSubmitResource">Submit</el-button>
      </span>
    </template>
  </el-dialog>
</template>