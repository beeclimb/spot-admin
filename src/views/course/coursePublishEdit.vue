<template>
  <div class="app-container">
    <h2 style="text-align: center;">Publishing New Courses</h2>
    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="Basic Course Information" icon="el-icon-document"/>
      <el-step title="Course Modules" icon="el-icon-document-copy"/>
      <el-step title="Release And Approve" icon="el-icon-upload"/>
    </el-steps>
    <div class="ccInfo">
      <img :src="coursePublish.cover">
      <div class="main">
        <h2>{{ coursePublish.title }}</h2>
        <p class="gray"><span>Class Numbers: {{ coursePublish.lessonNum }}</span></p>
        <p><span>Course Category: {{ coursePublish.subjectLevelOne }} — {{ coursePublish.subjectLevelTwo }}</span></p>
        <p>Course Teacher: {{ coursePublish.teacherName }}</p>
        <h3 class="red">Course Price: {{ coursePublish.price }}</h3>
      </div>
      <div class="two">
        <p><span>Course Introduction: {{ coursePublish.description }}</span></p>
      </div>
    </div>
    <div>
      <el-button type="info" @click="back">Back</el-button>
      <el-button type="primary" @click="next">Publish</el-button>
    </div>
  </div>
</template>

<script>
import { getCoursePublishInfoById, publishCourseById } from '@/api/course/info'

export default {
  name: 'CoursePublishEdit',
  data() {
    return {
      courseId: '',
      coursePublish: {}
    }
  },
  created() {
    this.getCourseId()
    this.fetchCoursePublishInfo(this.courseId)
  },
  methods: {
    next() {
      publishCourseById(this.courseId).then(response => {
        this.$router.push({ path: '/course/courseList' })
      })
    },
    back() {
      this.$router.push({ path: '/course/courseChapterEdit/' + this.courseId })
    },
    getCourseId() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
      }
    },
    fetchCoursePublishInfo(courseId) {
      getCoursePublishInfoById(courseId).then(response => {
        this.coursePublish = response.data.coursePublishVo
      })
    }
  }
}
</script>

<style scoped>
.ccInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #DDD;
  margin-bottom: 40px;
  position: relative;
}

.ccInfo img {
  background: #d6d6d6;
  width: 210px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}

.ccInfo .main {
  margin-left: 300px;
}

.ccInfo .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}

.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}

.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}

.ccInfo .main h3 {
  left: 310px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}

.ccInfo .two {
  position: absolute;
  bottom: 180px;
  margin-left: 700px;
}
</style>
