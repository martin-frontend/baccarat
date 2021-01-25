import request from '@/utils/request'

export function getCardsStatus() {
  return request({
    url: '/game/cards',
    method: 'get'
  })
}
export function getInit(params) {
  return request({
    url: '/game/init',
    method: 'get',
    params
  })
}
export function getResult() {
  return request({
    url: '/game/result',
    method: 'get'
  })
}
export function doExecute(data) {
  return request({
    url: '/game/execute',
    method: 'post',
    data
  })
}
export function doShuffle(data) {
  return request({
    url: '/game/shuffle',
    method: 'post',
    data
  })
}
