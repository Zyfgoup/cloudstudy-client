import request from '@/utils/request'
export default {


  //登录
  loginMember(memberInfo) {
    return request({
      url: `/auth/login`,
      method: 'post',
      data: memberInfo
    })
  },

  //根据id获取用户信息
  getInfoByName(nickname) {
    return request({
      url: `/user/user/getInfoByName/${nickname}`,
      method: 'post'
    })
  },

  //根据id获取用户信息  （个人中心用）
  getMemberInfoSelf(id) {
    return request({
      url: `/user/user/get/${id}`,
      method: 'get'
    })
  },

  //用户信息修改功能
  updataMemberInfo(ucenterMember) {
    return request({
      url: `/user/user/modify`,
      method: 'put',
      data: ucenterMember
    })
  },

  //修改密码
  ChangePassword(formItem) {
    return request({
      url: `/user/user/modifypwd`,
      method: 'post',
      data: formItem
    })
  },
}
