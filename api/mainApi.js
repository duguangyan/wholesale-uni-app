import {request}  from './request.js'

// 获取首页数据
const getHomeList = data => {
  return request({
    url: '/api/act/pageLayout/getListByParentId',
    data: data
  })
}

export { getHomeList }