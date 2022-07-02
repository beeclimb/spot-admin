<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="specification">
        <el-tag
          :key="item.label"
          :type="item.type">
          {{ item.label }}
        </el-tag>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      item: { type: 'info', label: 'Excel Specification' }
    }
  }
}
</script>

<style scoped>

</style>
