import request from '@/utils/request'

export default {

  addCart(cart) {
    return request({
      url: '/order/cart/add',
      method: 'post',
      data: cart
    })
  },


  removeById(id) {
    return request({
      url: `/order/cart/remove/${id}`,
      method: 'delete',
    })
  },


  getList() {
    return request({
      url: `/order/cart/list`,
      method: 'get',
    })
  },
}
