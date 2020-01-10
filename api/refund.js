import {request}  from './request.js'

// 获取退款列表
/*
id: 退款单号
pageIndex: 当前页
pageSize: 每页条数
sellName: 货主账号
status: -1 关闭 0 取消 1 新建 2货主审核中 3货主审核通过 4 货主审核不通过 5 平台审核 6 平台审核通过 7 平台审核不通过 8 进行中 9 平台退款失败 默认查全部
timeEnd: 申请时间(止)
timeStart: 申请时间(起)
userId: 用户id
userName: 买家账
*/
const getRefundList = data => {
	let url = '/api/ws/order/afterSale/saleList';
  return request({
    url: url,
    method: 'get',
    data,
    // type: 'form'
  })
}

// 用户申请平台接入
const applyPlatform = data => {
	let url = '/api/ws/order/afterSale/platformJoin/' + data.id;
  return request({
    url: url,
    method: 'post',
    data,
    // type: 'form'
  })
}

// 加载退款信息接口
/*
orderDetailId: 订单商品ID
*/
const loadRefundInfo = data => {
	let url = '/api/ws/order/afterSale/loadRefund';
  return request({
    url: url,
    method: 'post',
    data,
    type: 'form'
  })
}

// 退款详情
const getRefundDetail = data => {
	let url = '/api/ws/order/afterSale/appDetail/' + data.id + '/' + data.businessType;
  return request({
    url: url,
    method: 'get',
    // type: 'form'
  })
}

// app-用户关闭退款
const closeRefund = data => {
	let url = '/api/ws/order/afterSale/close/' + data.id;
  return request({
    url: url,
    method: 'post',
    // data,
    // type: 'form'
  })
}

// app-撤消退款
const cancelRefund = data => {
	let url = '/api/ws/order/afterSale/cancel/' + data.id;
  return request({
    url: url,
    method: 'post',
    data,
    // type: 'form'
  })
}

// app-发起退款
/*
descs: 说明描述
orderDetailId: 订单商品Id
reason: 理由
refundNum: 退款数量
imgList: 凭证
*/
const sendRefund = data => {
	let url = '/api/ws/order/afterSale/applyRefund/';
  return request({
    url: url,
    method: 'post',
    data,
    // type: 'form'
  })
}

// app-退款审核
/*
auditorType: 操作人类型:1 平台 2货主 3系统,4,买家
id: 退款单号
refundMoney: 退款金额
refuseReason: 拒绝原因
status: 审核状态(1:审核通过,0:审核不过
*/
const checkRefund = data => {
	let url = '/api/ws/order/afterSale/appAudit';
  return request({
    url: url,
    method: 'post',
    data,
    type: 'form'
  })
}

// 获取协商历史列表
// afterSaleId: 售后ID
const getNegoList = data => {
	let url = '/api/ws/order/afterSaleAudit/getAuditByAfterSaleId';
  return request({
    url: url,
    method: 'get',
    data,
    // type: 'form'
  })
}

export {getRefundList,applyPlatform,loadRefundInfo,closeRefund,cancelRefund,sendRefund,checkRefund,getRefundDetail,getNegoList }