<template>
  <div class="app-container">
    <h2 style="text-align: center;">Publishing New Courses</h2>
    <el-steps :active="1" finish-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="Basic Course Information" icon="el-icon-document"/>
      <el-step title="Course Modules" icon="el-icon-document-copy"/>
      <el-step title="Release And Approve" icon="el-icon-upload"/>
    </el-steps>
    <el-form ref="courseDataForm" :model="courseData" :rules="rules" label-width="120px">
      <el-form-item label="Title" prop="title">
        <el-input v-model="courseData.title"/>
      </el-form-item>
      <el-form-item label="Subject" prop="subject">
        <el-select v-model="courseData.subjectParentId" placeholder="Subject List" @change="getChildrenSubject">
          <el-option
            v-for="subjectParent in subjectParentList"
            :key="subjectParent.id"
            :label="subjectParent.title"
            :value="subjectParent.id"
          />
        </el-select>
        <el-select v-model="courseData.subjectId" placeholder="Select One" style="margin-left: 10px;">
          <el-option
            v-for="subjects in subjectsList"
            :key="subjects.id"
            :label="subjects.title"
            :value="subjects.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Cover">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          accept=".jpg, .png"
          :action="BASE_API+'/cloud/oss/uploadFile'"
          name="file"
        >
          <img :src="courseData.cover" class="avatar">
        </el-upload>
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
        <el-input-number v-model="courseData.lessonNum" :min="0"/>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="courseData.description"/>
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input-number v-model="courseData.price" :min="0"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="next('courseDataForm')">Next</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getTeacherList, saveBasicCourseInfo } from '@/api/course/info'
import { getAllSubjects } from '@/api/subject/subject'

export default {
  name: 'CourseInfo',
  data() {
    return {
      courseData: {
        teacherId: '',
        subjectParentId: '',
        subjectId: '',
        title: '',
        price: 0,
        lessonNum: 0,
        cover: 'https://spot-admin-1.oss-cn-shanghai.aliyuncs.com/cover.jpg',
        description: ''
      },
      teacherList: [],
      subjectParentList: [],
      subjectsList: [],
      BASE_API: process.env.VUE_APP_BASE_API,
      rules: {
        title: [
          { required: true, message: 'Please fill in the title', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Please fill in the description', trigger: 'blur' }
        ],
        price: [
          { required: true, message: 'Please fill in the description', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getTeachers()
    this.getSubjects()
  },
  methods: {
    handleAvatarSuccess(res) {
      this.courseData.cover = res.data.avatarUrl
    },
    beforeAvatarUpload(file) {
      const isJpg = file.type === 'image/jpeg'
      const is2M = file.size / 1024 / 1024 < 2
      if (!isJpg) {
        this.$message.error('File type error')
      }
      if (!is2M) {
        this.$message.error('File size error')
      }
      return isJpg && is2M
    },
    getChildrenSubject(subjectParentId) {
      for (let i = 0; i < this.subjectParentList.length; ++i) {
        if (this.subjectParentList[i].id === subjectParentId) {
          this.subjectsList = this.subjectParentList[i].secondSubjectList
          this.courseData.subjectId = ''
        }
      }
    },
    getSubjects() {
      getAllSubjects().then(response => {
        this.subjectParentList = response.data.allSubjects
      })
    },
    next(formName) {
      this.check(formName)
    },
    getTeachers() {
      getTeacherList().then(response => {
        this.teacherList = response.data
      })
    },
    check(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveBasicCourseInfo(this.courseData).then(response => {
            this.$message({
              message: 'Basic course information saved',
              type: 'success'
            })
            return response
          }).then(response => {
            this.$router.push({ path: '/course/courseChapterEdit/' + response.data.courseId })
          })
        } else {
          this.$notify({
            title: 'Warning',
            message: 'Check necessary information and retry',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
