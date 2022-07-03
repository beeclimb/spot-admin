<template>
  <div class="app-container">
    <h2 style="text-align: center;">Publishing New Courses</h2>
    <el-steps :active="2" finish-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="Basic Course Information" icon="el-icon-document" />
      <el-step title="Course Modules" icon="el-icon-document-copy" />
      <el-step title="Release And Approve" icon="el-icon-upload" />
    </el-steps>
    <el-form>
      <el-form-item>
        <el-button type="info" @click="back">Back</el-button>
        <el-button type="primary" @click="next">Next</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CourseChapterEdit',
  data() {
    return {}
  },
  created() {
    console.log('course chapter created')
  },
  methods: {
    next() {
      console.log('next')
      this.$router.push({ path: '/course/coursePublishEdit/1' })
    },
    back() {
      console.log('back')
      this.$router.push({ path: '/course/courseInfoEdit/1' })
    }
  }
}
</script>

<style scoped>

</style>
