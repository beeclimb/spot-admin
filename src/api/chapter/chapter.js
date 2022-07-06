import request from '@/utils/request'

export function getChapterVideo(courseId) {
  return request({
    url: `/education/chapter/getChapterVideoByCourseId/${courseId}`,
    method: 'get'
  })
}

export function addChapter(chapter) {
  return request({
    url: `/education/chapter/addChapter`,
    method: 'post',
    data: chapter
  })
}

export function updateChapter(chapter) {
  return request({
    url: `/education/chapter/updateChapter`,
    method: 'post',
    data: chapter
  })
}

export function getChapterById(chapterId) {
  return request({
    url: `/education/chapter/getChapterById/${chapterId}`,
    method: 'get'
  })
}

export function deleteChapterById(chapterId) {
  return request({
    url: `/education/chapter/deleteChapter/${chapterId}`,
    method: 'delete'
  })
}
