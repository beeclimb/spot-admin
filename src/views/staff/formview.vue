<template>
  <div class="app-container">
    <el-form ref="teacher" :model="teacher" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Staff Name" prop="name">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="Sort" prop="sort">
        <el-input-number v-model="teacher.sort" :min="0" />
      </el-form-item>
      <el-form-item label="Level" prop="level">
        <el-select v-model="teacher.level" placeholder="Please select the staff level">
          <el-option label="high" value="1" />
          <el-option label="medium" value="2" />
          <el-option label="low" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="Career" prop="career">
        <el-input v-model="teacher.career" type="textarea" />
      </el-form-item>
      <el-form-item label="Introduction" prop="intro">
        <el-input v-model="teacher.intro" type="textarea" />
      </el-form-item>
      <!-- 讲师头像 -->
      <el-form-item label="Avatar">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="info" icon="el-icon-upload" size="small" @click="imagecropperShow=true">Upload
        </el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="100"
          :height="100"
          :ki="imagecropperKey"
          :url="BASE_API+'/cloud/oss/uploadFile'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Finish</el-button>
        <el-button @click="resetForm('teacher')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addTeacher, getTeacherInfoById, updateTeacherById } from '@/api/staff/staff'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  name: 'FormView',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: 'https://webstatic.mihoyo.com/upload/op-public/2021/10/09/c218c585aac4aad0a30ab9a6e0e0794c_3908343860724847173.png'
      },
      rules: {
        name: [
          { required: true, message: 'Your name', trigger: 'blur' }
        ],
        career: [
          { required: true, message: 'Your profession', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: 'Introduce yourself', trigger: 'blur' }
        ]
      },
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.VUE_APP_BASE_API
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getTeacherInfo(id)
    }
  },
  methods: {
    submitForm() {
      this.teacher.id ? this.updateTeacherInfo() : this.addTeacherInfo()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getTeacherInfo(id) {
      getTeacherInfoById(id).then(response => {
        this.teacher = response.data
      })
    },
    addTeacherInfo() {
      addTeacher(this.teacher).then(response => {
        this.$message({
          message: 'Submit successfully',
          type: 'success'
        })
        this.$router.push({ path: '/staff/overview' })
      }).catch(error => {
        console.log(error)
        this.$message.error('Submit failure')
      })
    },
    updateTeacherInfo() {
      updateTeacherById(this.teacher).then(response => {
        this.$message({
          message: 'Update successfully',
          type: 'success'
        })
        this.$router.push({ path: '/staff/overview' })
      }).catch(error => {
        console.log(error)
        this.$message.error('Update failure')
      })
    },
    close() {
      this.imagecropperShow = false
      ++this.imagecropperKey
    },
    cropSuccess(response) {
      this.close()
      this.teacher.avatar = response.avatarUrl
    }
  }
}
</script>
