<template>
  <div class="app-container">
    <h2 style="text-align: center;">Publishing New Courses</h2>
    <el-steps :active="2" finish-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="Basic Course Information" icon="el-icon-document"/>
      <el-step title="Course Modules" icon="el-icon-document-copy"/>
      <el-step title="Release And Approve" icon="el-icon-upload"/>
    </el-steps>
    <el-button type="text">Add Chapter</el-button>
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoData" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text">添加课时</el-button>
            <el-button style="" type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </span>
        </p>
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.videoInChapter" :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <el-form>
      <el-form-item>
        <el-button type="info" @click="back">Back</el-button>
        <el-button type="primary" @click="next">Next</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getChapterVideo } from '@/api/chapter/chapter'

export default {
  name: 'CourseChapterEdit',
  data() {
    return {
      chapterVideoData: [],
      courseId: ''
    }
  },
  created() {
    this.getCourseId()
    this.getChapterVideoData(100)
  },
  methods: {
    getChapterVideoData(courseId) {
      getChapterVideo(courseId).then(response => {
        this.chapterVideoData = response.data.chapterVideoList
      })
    },
    next() {
      console.log('next')
      this.$router.push({ path: '/course/coursePublishEdit/' + this.courseId })
    },
    back() {
      console.log('back')
      this.$router.push({ path: '/course/courseInfoEdit/' + this.courseId })
    },
    getCourseId() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
      }
    }
  }
}
</script>

<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.chanpterList li {
  position: relative;
}

.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}

.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}

.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
</style>
