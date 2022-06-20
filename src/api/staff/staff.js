import request from '@/utils/request'

export function getStaff(current, size, teacherVo) {
  return request({
    url: `/education/teacher/conditionalPagination/${current}/${size}`,
    method: 'post',
    data: teacherVo
  })
}

export function deleteTeacherById(teacherId) {
  return request({
    url: `/education/teacher/${teacherId}`,
    method: 'Delete'
  })
}

export function addTeacher(teacher) {
  return request({
    url: `/education/teacher/addTeacher`,
    method: 'post',
    data: teacher
  })
}

export function getTeacherInfoById(id) {
  return request({
    url: `/education/teacher/queryTeacherById/${id}`,
    method: 'get'
  })
}

export function updateTeacherById(teacher) {
  return request({
    url: `/education/teacher/updateTeacherById`,
    method: 'post',
    data: teacher
  })
}
