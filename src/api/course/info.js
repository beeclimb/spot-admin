import request from '@/utils/request'

export function saveBasicCourseInfo(courseData) {
  return request({
    url: '/education/course/addCourseInfo',
    method: 'post',
    data: courseData
  })
}

export function getTeacherList() {
  return request({
    url: '/education/teacher/queryAllTeachers',
    method: 'get'
  })
}
