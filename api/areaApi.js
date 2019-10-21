import {request}  from './request.js'
const getArea = data => {
  return request({
    url: '/api/goods/goods/provinces',
    data
  })
}

export { getArea }