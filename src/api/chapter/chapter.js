import request from '@/utils/request'

export function getChapterVideo(courseId) {
  return request({
    url: `/education/chapter/getChapterVideoByCourseId/${courseId}`,
    method: 'get'
  })
}
