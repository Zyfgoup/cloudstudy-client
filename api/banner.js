import request from '@/utils/request'
export default {
  getBannerList() {
    return request({
      url: `/cms/front-banner/getAllBanner`,
      method: 'get'
    })
  },
}
