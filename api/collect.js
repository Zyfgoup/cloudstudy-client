import request from '@/utils/request'

export default {

  //判断是否收藏
  isCollect(courseId) {
    return request({
      url: `/service/collect/is-collect/${courseId}`,
      method: 'get'
    })
  },

  //收藏课程  添加一条收藏的记录
  addCollect(courseId) {
    return request({
      url: `/service/collect/addCourseCollect/${courseId}`,
      method: 'post'
    })
  },

  //获取课程收藏列表
  getCollectList() {
    return request({
      url: '/service/collect/courseCollectList',
      method: 'get'
    })
  },

  //取消收藏  删除一条收藏的记录
  removeCollectById(courseId) {
    return request({
      url: `/service/collect/remove/${courseId}`,
      method: 'delete'
    })
  }
}
