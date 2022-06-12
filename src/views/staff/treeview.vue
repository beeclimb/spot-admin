<template>
  <div class="app-container">
    Staff List
  </div>
</template>

<script>
import { getStaff } from '@/api/staff/staff'

export default {
  name: 'OverView',
  data() {
    return {
      current: 1,
      size: 2,
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
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
