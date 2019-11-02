import {request}  from './request.js'
const getArea = data => {
  return request({
    url: '/api/goods/goods/provinces',
    data
  })
}

const getProvinces = data => {
  return request({
    url: '/api/upms/area/getChildrenByPId',
    data
  })
}

export {getArea, getProvinces }