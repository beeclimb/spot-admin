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

export function getCourseInfoById(courseId) {
  return request({
    url: `/education/course/getCourseInfo/${courseId}`,
    method: 'get'
  })
}

export function updateCourseInfo(courseInfoVo) {
  return request({
    url: '/education/course/updateCourseInfo',
    method: 'post',
    data: courseInfoVo
  })
}
