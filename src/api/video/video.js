import request from '@/utils/request'

export function addVideo(videoInfo) {
  return request({
    url: '/education/video/addVideo',
    method: 'post',
    data: videoInfo
  })
}

export function deleteVideoById(videoId) {
  return request({
    url: `/education/video/deleteVideo/${videoId}`,
    method: 'delete'
  })
}

export function getVideoById(videoId) {
  return request({
    url: `/education/video/getVideoById/${videoId}`,
    method: 'get'
  })
}

export function updateVideo(videoInfo) {
  return request({
    url: '/education/video/updateVideo',
    method: 'post',
    data: videoInfo
  })
}
