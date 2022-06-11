import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/temp/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/temp/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/temp/user/logout',
    method: 'post'
  })
}
