import request from '@/utils/request'
export default {
  //广告位
  getTopBannerAdList() {
      return request({
        url: '/cms/front-cms/list/1',
        method: 'get'
      })
    },

  //查询8热门课程
  getHotCourse() {
    return request({
      url: `/service/indexfront/indexHotCourse`,
      method: 'get'
    })
  },

  //查询4热门老师
  getHotTeacher() {
    return request({
      url: `/service/indexfront/indexHotTeacher`,
      method: 'get'
    })
  },
}
