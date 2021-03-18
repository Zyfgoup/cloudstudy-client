import request from '@/utils/request'

export default {
  //直接购买生成订单
  createOrders(courseId) {
    return request({
      url: '/order/order/createOrder/' + courseId,
      method: 'post'
    })
  },

  createOrdersByCart(cartList){
    return request({
      url: '/order/order/createOrderByCart/',
      method: 'post',
      data: cartList
    })
  },

  //根据订单id查询订单信息
  getOrdersInfo(orderId) {
    return request({
      url: '/order/order/getOrderInfo/' + orderId,
      method: 'get'
    })
  },

  //单个课程生成二维码的方法
  createQRcode(id) {
    return request({
      url: '/order/pay-log/createQrCode/' + id,
      method: 'get'
    })
  },

  createQRcodeByCart(orderNo) {
    return request({
      url: '/order/pay-log/createQrCodeByCart/' + orderNo,
      method: 'get'
    })
  },


  //查询订单状态的方法
  queryPayStatus(orderNo) {
    return request({
      url: '/order/pay-log/queryPayStatus/' + orderNo,
      method: 'get'
    })
  },

  //获取用户所有订单
  getOrderList(){
    return request({
      url: `/order/order/orderList`,
      method: 'get'
    })
  },
  //获取用户所有订单
  getOrderListByOrdeoNo(orderNo){
    return request({
      url: `/order/order/orderListByOrderNo/${orderNo}`,
      method: 'get'
    })
  },

  //根据订单id删除订单
  removeOrderById(orderId){
    return request({
      url: `/order/order/removeOrder/${orderId}`,
      method: 'delete'
    })
  },

  //查询订单表中订单的状态 判断课程是否购买
  isBought(courseId) {
    return request({
      url: `/order/order/isBought/${courseId}`,
      method: 'get'
    })
  },
}
