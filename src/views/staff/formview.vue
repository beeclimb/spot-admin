<template>
  <div class="app-container">
    <el-form :model="teacher" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Staff Name" prop="name">
        <el-input v-model="teacher.name"></el-input>
      </el-form-item>
      <el-form-item label="Introduction" prop="desc">
        <el-input type="textarea" v-model="teacher.intro"></el-input>
      </el-form-item>
      <el-form-item label="Level" prop="level">
        <el-select v-model="teacher.level" placeholder="Please select the staff level">
          <el-option label="high" value="1"></el-option>
          <el-option label="medium" value="2"></el-option>
          <el-option label="low" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('teacher')">Finish</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addTeacher } from '@/api/staff/staff'

export default {
  name: 'FormView',
  data() {
    return {
      teacher: {
        name: '',
        intro: '',
        level: 1,
      }
    }
  },
  methods: {
    submitForm(teacherVo) {
      addTeacher(teacherVo)
    }
  }
}
</script>
