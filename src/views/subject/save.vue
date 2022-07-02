<template>
  <div class="app-container">
    <el-form>
      <el-form-item>
        <el-tag
          :key="item.label"
          :type="item.type"
          effect="dark"
        >
          {{ item.label }}
        </el-tag>
        <el-tag>
          <i class="el-icon-download"></i>
          <a href="https://spot-admin-1.oss-cn-shanghai.aliyuncs.com/template.xlsx">Click me to view templates</a>
        </el-tag>
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="handleSuccess"
          :on-error="handleError"
          :limit="1"
          :action="BASE_API + '/education/subject/addSubject'"
          :disabled="UPLOAD_BUTTON_DISABLED"
          name="file"
          accept=".xls, .xlsx"
        >
          <el-button slot="trigger" size="small" type="info">Select Excel</el-button>
          <el-button style="margin-left: 20px;" size="small" type="success" :loading="LOADING" @click="submitUpload">
            {{ UPLOAD_BUTTON_TEXT }}
          </el-button>
          <div slot="tip" class="el-upload__tip">Only excel supported and the maximum size is 500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Save',
  data() {
    return {
      item: { type: 'info', label: 'Excel Template' },
      BASE_API: process.env.VUE_APP_BASE_API,
      UPLOAD_BUTTON_TEXT: 'Upload Cloud',
      UPLOAD_BUTTON_DISABLED: false,
      LOADING: false
    }
  },
  methods: {
    submitUpload() {
      this.UPLOAD_BUTTON_TEXT = 'Uploading'
      this.UPLOAD_BUTTON_DISABLED = true
      this.LOADING = true
      this.$refs.upload.submit()
    },
    handleSuccess(response) {
      if (response.code === 200) {
        this.UPLOAD_BUTTON_TEXT = 'Upload Success'
        this.UPLOAD_BUTTON_DISABLED = false
        this.LOADING = false
        this.$message({
          type: 'success',
          message: 'Upload Successfully'
        })
      }
    },
    handleError(response) {
      if (response.code !== 200) {
        this.UPLOAD_BUTTON_TEXT = 'Upload Fail'
        this.UPLOAD_BUTTON_DISABLED = false
        this.LOADING = false
        this.$message({
          type: 'error',
          message: 'Upload Failed'
        })
      }
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 20px;
}
</style>
