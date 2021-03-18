
import request from '@/utils/request'
export default {
  //条件分页课程查询的方法
  getCourseList(page, limit, courseObj) {
    return request({
      url: `/service/coursefront/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data: courseObj
    })
  },

  getFreeCourseList(page, limit, courseObj) {
    return request({
      url: `/service/coursefront/getFrontCourseList/free/${page}/${limit}`,
      method: 'post',
      data: courseObj
    })
  },

  //查询所有分类的方法
  getAllSubject() {
    return request({
      url: '/service/category/get/all',
      method: 'get'
    })
  },

  //课程详情的方法
  getCourseInfo(courseId) {
    return request({
      url: `/service/coursefront/getFrontCourseInfo/${courseId}`,
      method: 'get'
    })
  }
}
