import request from '@/utils/request'

export function getStaff(current, size, teacherVo) {
  return request({
    url: `/education/teacher/conditionalPagination/${current}/${size}`,
    method: 'post',
    data: teacherVo
  })
}
