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
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="intro"
        label="Introduction"
        width="120"
      >
      </el-table-column>
      <el-table-column
        label="Career"
        width="120"
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
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="Avatar"
        width="240"
      >
      </el-table-column>
      <el-table-column align="right">
        <template v-slot="scope">
          <router-link :to="'/staff/editInfo/'+scope.row.id">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle style="margin-right: 10px"></el-button>
          </router-link>
          <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row.id)"
          ></el-button>
        </template>
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
import { deleteTeacherById, getStaff } from '@/api/staff/staff'

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
    },
    handleEdit(id) {
      console.log(id)
    },
    handleDelete(id) {
      this.$confirm('This operation permanently deletes this record. Continue or not?', 'Warning', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        await deleteTeacherById(id)
        this.$message({
          type: 'success',
          message: 'Deleted!'
        })
        await this.fetchData()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
