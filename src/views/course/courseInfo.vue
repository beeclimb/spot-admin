<template>
  <div class="app-container">
    <h2 style="text-align: center;">Publishing New Courses</h2>
    <el-steps :active="1" finish-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="Basic Course Information" icon="el-icon-document" />
      <el-step title="Course Modules" icon="el-icon-document-copy" />
      <el-step title="Release And Approve" icon="el-icon-upload" />
    </el-steps>
    <el-form ref="courseData" :model="courseData" label-width="120px">
      <el-form-item label="Title" prop="title">
        <el-input v-model="courseData.title" />
      </el-form-item>
      <el-form-item label="Staff">
        <el-select v-model="courseData.teacherId" placeholder="Staff List">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Lessons" prop="lessons">
        <el-input-number v-model="courseData.lessonNum" :min="0" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="courseData.description" />
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input-number v-model="courseData.price" :min="0" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="next">Next</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getTeacherList, saveBasicCourseInfo } from '@/api/course/info'

export default {
  name: 'CourseInfo',
  data() {
    return {
      courseData: {
        teacherId: '',
        subjectId: '',
        title: '',
        price: 0,
        lessonNum: 0,
        cover: '',
        description: ''
      },
      teacherList: []
    }
  },
  created() {
    this.getTeachers()
  },
  methods: {
    next() {
      saveBasicCourseInfo(this.courseData).then(response => {
        this.$message({
          message: 'Basic course information saved',
          type: 'success'
        })
        return response
      }).then(response => {
        this.$router.push({ path: '/course/courseChapterEdit/' + response.data.courseId })
      })
    },
    getTeachers() {
      getTeacherList().then(response => {
        this.teacherList = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
