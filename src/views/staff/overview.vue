<template>
  <div class="app-container">
    <el-form :inline="true" :model="teacherVo" class="demo-form-inline" size="mini">
      <el-form-item label="StaffName" prop="inputForm">
        <el-input v-model="teacherVo.name" placeholder="name"></el-input>
      </el-form-item>
      <el-form-item label="StaffLevel" prop="selectForm">
        <el-select v-model="teacherVo.level" placeholder="level">
          <el-option label="High" value="1"></el-option>
          <el-option label="Medium" value="2"></el-option>
          <el-option label="Low" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">Search</el-button>
        <el-button @click="resetForm()">Reset</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="teacherList"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="Introduction"
        width="180"
      >
        <template v-slot="scope">
          <div v-if="scope.row.level===1">{{ 'high' }}</div>
          <div v-else-if="scope.row.level===2">{{ 'medium' }}</div>
          <div v-else>{{ 'row' }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="Career"
        width="180"
      >
        <template v-slot="scope">
          <div v-if="scope.row.level===1">{{ 'high' }}</div>
          <div v-else-if="scope.row.level===2">{{ 'medium' }}</div>
          <div v-else>{{ 'row' }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="level"
        label="Level"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="Avatar"
        width="180"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="fetchData"
      @current-change="fetchData"
      :current-page.sync="current"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getStaff } from '@/api/staff/staff'

export default {
  name: 'OverView',
  data() {
    return {
      current: 1,
      size: 4,
      total: 0,
      teacherVo: {},
      teacherList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getStaff(this.current, this.size, this.teacherVo)
        .then(response => {
          this.total = response.data.total
          this.teacherList = response.data.records
        })
        .catch(error => {
          console.log(error)
        })
    },
    resetForm() {
      this.teacherVo = {}
      this.fetchData()
    }
  }
}
</script>
