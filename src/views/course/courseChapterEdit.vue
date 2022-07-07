<template>
  <div class="app-container">
    <h2 style="text-align: center;">Publishing New Courses</h2>
    <el-steps :active="2" finish-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="Basic Course Information" icon="el-icon-document"/>
      <el-step title="Course Modules" icon="el-icon-document-copy"/>
      <el-step title="Release And Approve" icon="el-icon-upload"/>
    </el-steps>
    <el-button type="text" @click="openForm">Add Chapter</el-button>
    <!-- chapter from -->
    <el-dialog title="Chapter" :visible.sync="dialogFormVisible">
      <el-form :model="chapterData">
        <el-form-item label="Chapter Name" :label-width="formLabelWidth">
          <el-input v-model="chapterData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Sort" :label-width="formLabelWidth">
          <el-input-number v-model="chapterData.sort" :min="0" autocomplete="off"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">Cancel</el-button>
        <el-button type="primary" @click="submitChapter">Continue</el-button>
      </div>
    </el-dialog>
    <!-- video from -->
    <el-dialog title="Video" :visible.sync="videoFormVisible">
      <el-form :model="videoData">
        <el-form-item label="Video Name" :label-width="formLabelWidth">
          <el-input v-model="videoData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Sort" :label-width="formLabelWidth">
          <el-input-number v-model="videoData.sort" :min="0" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="Free" :label-width="formLabelWidth">
          <el-radio-group v-model="videoData.isFree">
            <el-radio :label="1">Of course</el-radio>
            <el-radio :label="0">No way</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeVideoForm">Cancel</el-button>
        <el-button type="primary" @click="submitVideoForm">Continue</el-button>
      </div>
    </el-dialog>
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoData" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button-group>
              <el-button type="primary" icon="el-icon-more" size="small" @click="openVideoForm(chapter.id)"></el-button>
              <el-button type="info" icon="el-icon-edit" size="small" @click="editChapter(chapter.id)"></el-button>
              <el-button type="info" icon="el-icon-delete" size="small" @click="handleDelete(chapter.id)"></el-button>
            </el-button-group>
          </span>
        </p>
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.videoInChapter" :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
                <el-button-group>
                  <el-button type="info" icon="el-icon-edit" size="small" @click="editVideo(video.id)"/>
                  <el-button type="info" icon="el-icon-delete" size="small" @click="deleteVideo(video.id)"/>
                </el-button-group>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button type="info" @click="back">Back</el-button>
      <el-button type="primary" @click="next">Next</el-button>
    </div>
  </div>
</template>

<script>
import { addChapter, deleteChapterById, getChapterById, getChapterVideo, updateChapter } from '@/api/chapter/chapter'
import { addVideo, deleteVideoById, getVideoById, updateVideo } from '@/api/video/video'

export default {
  name: 'CourseChapterEdit',
  data() {
    return {
      chapterVideoData: [],
      courseId: '',
      dialogFormVisible: false,
      chapterData: {
        title: '',
        sort: 0
      },
      formLabelWidth: '120px',
      videoFormVisible: false,
      videoData: {
        title: '',
        sort: 0,
        isFree: 0,
        videoSourceId: ''
      }
    }
  },
  created() {
    this.getCourseId()
    this.getChapterVideoData(this.courseId)
  },
  methods: {
    // ================================== Video Operation =====================================
    getVideo(videoId) {
      getVideoById(videoId).then(response => {
        this.videoData = response.data.video
      })
    },
    async updateVideoInfo() {
      await updateVideo(this.videoData).then(response => {
        this.videoFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Video info updated successfully',
          type: 'success'
        })
        this.getChapterVideoData(this.courseId)
      })
      this.videoData.id = ''
    },
    editVideo(videoId) {
      this.videoFormVisible = true
      this.getVideo(videoId)
    },
    deleteVideo(videoId) {
      this.$confirm('This operation permanently deletes this record. Continue or not?', 'Warning', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        await deleteVideoById(videoId)
        this.$message({
          type: 'success',
          message: 'Deleted!'
        })
        await this.getChapterVideoData(this.courseId)
      }).catch(error => {
        console.log(error)
      })
    },
    closeVideoForm() {
      this.videoFormVisible = false
      this.videoData.id = ''
    },
    openVideoForm(chapterId) {
      this.videoFormVisible = true
      this.videoData.courseId = this.courseId
      this.videoData.chapterId = chapterId
      this.videoData.title = ''
      this.videoData.sort = 0
      this.videoData.isFree = 0
      this.videoData.videoSourceId = ''
    },
    saveVideo() {
      addVideo(this.videoData).then(response => {
        this.videoFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Video info saved successfully',
          type: 'success'
        })
        this.getChapterVideoData(this.courseId)
      })
    },
    submitVideoForm() {
      if (this.videoData.id) {
        this.updateVideoInfo()
      } else {
        this.saveVideo()
      }
    },
    // ================================== Chapter Operation====================================
    handleDelete(id) {
      this.$confirm('This operation permanently deletes this record. Continue or not?', 'Warning', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        await deleteChapterById(id)
        this.$message({
          type: 'success',
          message: 'Deleted!'
        })
        await this.getChapterVideoData(this.courseId)
      }).catch(error => {
        console.log(error)
      })
    },
    openForm() {
      this.chapterData.title = ''
      this.chapterData.sort = 0
      this.dialogFormVisible = true
    },
    editChapter(chapterId) {
      this.dialogFormVisible = true
      getChapterById(chapterId).then(response => {
        this.chapterData = response.data.chapter
      })
    },
    closeForm() {
      this.chapterData.title = ''
      this.chapterData.sort = 0
      this.dialogFormVisible = false
    },
    saveChapter() {
      this.chapterData.courseId = this.courseId
      addChapter(this.chapterData).then(response => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Chapter info saved successfully',
          type: 'success'
        })
        this.getChapterVideoData(this.courseId)
      })
    },
    update() {
      updateChapter(this.chapterData).then(response => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Chapter info updated successfully',
          type: 'success'
        })
        this.getChapterVideoData(this.courseId)
      })
    },
    submitChapter() {
      if (this.chapterData.id) {
        this.update()
      } else {
        this.saveChapter()
      }
    },
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
