<script lang="ts">
import { defineComponent, onMounted, Ref } from 'vue'
import { ref, reactive } from 'vue'

export default defineComponent({
  setup(props, context) {
    onMounted(() => {
      console.log(props, context, 'props, context')
    })
    let list: string[] = []
    let msg = ref('abc')
    function onUpdateMsg () {
      list.push(msg.value)
      msg.value = ''
    } 
    return {
      list,
      msg,
      onUpdateMsg
    }
  },
})
</script>

<template>
  <input type="text" v-model="msg">
  <ul>
    <li v-for="(item, index) in list" :key="index">{{ item }}</li>
  </ul>
  <button type="button" @click="onUpdateMsg">添加</button>
</template>
