<template>
  <div class="app-container">
    <el-form :model="teacher" ref="teacher" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Staff Name" prop="name">
        <el-input v-model="teacher.name"></el-input>
      </el-form-item>
      <el-form-item label="Sort" prop="sort">
        <el-input-number v-model="teacher.sort" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="Level" prop="level">
        <el-select v-model="teacher.level" placeholder="Please select the staff level">
          <el-option label="high" value="1"></el-option>
          <el-option label="medium" value="2"></el-option>
          <el-option label="low" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Career" prop="career">
        <el-input v-model="teacher.career" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Introduction" prop="intro">
        <el-input v-model="teacher.intro" type="textarea"></el-input>
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

export default {
  name: 'FormView',
  data() {
    return {
      teacher: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: ''
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
      }
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
    }
  }
}
</script>
