import {request}  from './request.js'

// 采购列表
/*
categoryId：采购品类
pageIndex：当前页
pageSize：每页条数
phone：采购人手机
realName：采购人姓名
status：状态 1 新建 2 审核中 3 审核通过（上架） 4 审核不通过 5 下架
timeEnd：提交时间(止)
timeStart：提交时间(起)
userName：采购人账号
*/
const getProcurementList = data => {
	let url = '/api/ws/goods/purchase/page';
  return request({
    url: url,
    method: 'get',
    data
  })
}

// 重新发布采购
/*
auditTim：审核时间
categoryId：分类id
createTime：创建时间
creatorId：发布人ID
deliveryMethod：发货方式
id：id
packRequire：包装要求
prodCity：生产市
prodCityId：生产市ID
prodProvince：生产省
prodProvinceId：生产省ID
prodRegion：生产县/区
prodRegionId：生产县/区ID
quantity：数量
receiveCity：收货市
receiveCityId：收货市ID
receiveProvince：收货省
receiveProvinceId：收货省ID
receiveRegion：收货县/区
receiveRegionId：收货县/区ID
remark：补充说明
replyContent：审核回复内容
specAttributes：规格属性
status：状态 1 新建 2 审核中 3 审核通过（上架） 4 审核不通过 5 下架
unit：单位
variety：品种
*/
const republish = data => {
	let url = '/api/ws/goods/purchase/edit';
  return request({
    url: url,
    method: 'post',
    data
  })
}

// xin发布采购
/*
auditTim：审核时间
categoryId：分类id
createTime：创建时间
creatorId：发布人ID
deliveryMethod：发货方式
id：id
packRequire：包装要求
prodCity：生产市
prodCityId：生产市ID
prodProvince：生产省
prodProvinceId：生产省ID
prodRegion：生产县/区
prodRegionId：生产县/区ID
quantity：数量
receiveCity：收货市
receiveCityId：收货市ID
receiveProvince：收货省
receiveProvinceId：收货省ID
receiveRegion：收货县/区
receiveRegionId：收货县/区ID
remark：补充说明
replyContent：审核回复内容
specAttributes：规格属性
status：状态 1 新建 2 审核中 3 审核通过（上架） 4 审核不通过 5 下架
unit：单位
variety：品种
*/
const newPublish = data => {
	let url = '/api/ws/goods/purchase/save';
  return request({
    url: url,
    method: 'post',
    data
  })
}

// 我的采购列表
/*
pageIndex：当前页
pageSize：每页条数
status：状态 1 全部 2 有报价
*/
const getOwnProcurementList = data => {
	let url = '/api/ws/goods/purchase/myPage';
  return request({
    url: url,
    method: 'get',
    data
  })
}

// App-采购列表查询分类
/*
none
*/
const getClassify = data => {
	let url = '/api/ws/goods/purchase/listCategory';
  return request({
    url: url,
    method: 'get',
    data
  })
}

// 采购详情
/*
id：拼接参数，不需要在body里
type: 操作类型(1采购大厅,2我的订单)
*/
const getProcurementDetail = data => {
	let url = '/api/ws/goods/purchase/detail/' + data.id;
  return request({
    url: url,
    method: 'get',
    data: {
      type: data.type
    }
  })
}

// 撤回
/*
id：拼接参数，不需要在body里
*/
const rollback = data => {
	let url = '/api/ws/goods/purchase/cancel/' + data.id;
  return request({
    url: url,
    method: 'post'
  })
}


// 发布报价
/*
{
  "createTime": "string",
  "id": "string",
  "offerId": "string",
  "price": 0,
  "priceType": 0,
  "purchaseId": "string",
  "urlList": [
    "string"
  ]
}
*/

const publishPrice = data=>{
  let url = '/api/ws/goods/purchaseQuotation/insert';
  return request({
    url: url,
    method: 'post'
  })
}

export { getProcurementList,getOwnProcurementList,getProcurementDetail,rollback,getClassify,newPublish,republish,publishPrice }