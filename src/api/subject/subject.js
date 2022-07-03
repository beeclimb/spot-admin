import request from '@/utils/request'

export function getAllSubjects() {
  return request({
    url: '/education/subject/getAllSubjects',
    method: 'get'
  })
}
