import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e737d960 = () => interopDefault(import('..\\pages\\course\\index.vue' /* webpackChunkName: "pages_course_index" */))
const _0967d49f = () => interopDefault(import('..\\pages\\free\\index.vue' /* webpackChunkName: "pages_free_index" */))
const _ca719c3c = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _149bac20 = () => interopDefault(import('..\\pages\\practice\\index.vue' /* webpackChunkName: "pages_practice_index" */))
const _70d703ba = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages_register" */))
const _1d724beb = () => interopDefault(import('..\\pages\\shopCar\\index.vue' /* webpackChunkName: "pages_shopCar_index" */))
const _69024a87 = () => interopDefault(import('..\\pages\\teacher\\index.vue' /* webpackChunkName: "pages_teacher_index" */))
const _481fd6c3 = () => interopDefault(import('..\\pages\\ucenter.vue' /* webpackChunkName: "pages_ucenter" */))
const _f54a2742 = () => interopDefault(import('..\\pages\\ucenter\\index.vue' /* webpackChunkName: "pages_ucenter_index" */))
const _2a6ce50d = () => interopDefault(import('..\\pages\\ucenter\\info\\basic.vue' /* webpackChunkName: "pages_ucenter_info_basic" */))
const _5e6eade8 = () => interopDefault(import('..\\pages\\ucenter\\info\\password.vue' /* webpackChunkName: "pages_ucenter_info_password" */))
const _28487629 = () => interopDefault(import('..\\pages\\ucenter\\msg\\message.vue' /* webpackChunkName: "pages_ucenter_msg_message" */))
const _64362dc4 = () => interopDefault(import('..\\pages\\ucenter\\study\\collect.vue' /* webpackChunkName: "pages_ucenter_study_collect" */))
const _3b9f0b30 = () => interopDefault(import('..\\pages\\ucenter\\study\\order.vue' /* webpackChunkName: "pages_ucenter_study_order" */))
const _15d111be = () => interopDefault(import('..\\pages\\practice\\success.vue' /* webpackChunkName: "pages_practice_success" */))
const _7d02ac90 = () => interopDefault(import('..\\pages\\course\\_id.vue' /* webpackChunkName: "pages_course__id" */))
const _859489dc = () => interopDefault(import('..\\pages\\order\\_oid.vue' /* webpackChunkName: "pages_order__oid" */))
const _20592b6d = () => interopDefault(import('..\\pages\\pay\\_pid.vue' /* webpackChunkName: "pages_pay__pid" */))
const _d734f2ec = () => interopDefault(import('..\\pages\\player\\_vid.vue' /* webpackChunkName: "pages_player__vid" */))
const _644d6fc3 = () => interopDefault(import('..\\pages\\shopCar\\_pid.vue' /* webpackChunkName: "pages_shopCar__pid" */))
const _98417aa2 = () => interopDefault(import('..\\pages\\teacher\\_id.vue' /* webpackChunkName: "pages_teacher__id" */))
const _5dc0e26a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/course",
    component: _e737d960,
    name: "course"
  }, {
    path: "/free",
    component: _0967d49f,
    name: "free"
  }, {
    path: "/login",
    component: _ca719c3c,
    name: "login"
  }, {
    path: "/practice",
    component: _149bac20,
    name: "practice"
  }, {
    path: "/register",
    component: _70d703ba,
    name: "register"
  }, {
    path: "/shopCar",
    component: _1d724beb,
    name: "shopCar"
  }, {
    path: "/teacher",
    component: _69024a87,
    name: "teacher"
  }, {
    path: "/ucenter",
    component: _481fd6c3,
    children: [{
      path: "",
      component: _f54a2742,
      name: "ucenter"
    }, {
      path: "info/basic",
      component: _2a6ce50d,
      name: "ucenter-info-basic"
    }, {
      path: "info/password",
      component: _5e6eade8,
      name: "ucenter-info-password"
    }, {
      path: "msg/message",
      component: _28487629,
      name: "ucenter-msg-message"
    }, {
      path: "study/collect",
      component: _64362dc4,
      name: "ucenter-study-collect"
    }, {
      path: "study/order",
      component: _3b9f0b30,
      name: "ucenter-study-order"
    }]
  }, {
    path: "/practice/success",
    component: _15d111be,
    name: "practice-success"
  }, {
    path: "/course/:id",
    component: _7d02ac90,
    name: "course-id"
  }, {
    path: "/order/:oid?",
    component: _859489dc,
    name: "order-oid"
  }, {
    path: "/pay/:pid?",
    component: _20592b6d,
    name: "pay-pid"
  }, {
    path: "/player/:vid?",
    component: _d734f2ec,
    name: "player-vid"
  }, {
    path: "/shopCar/:pid",
    component: _644d6fc3,
    name: "shopCar-pid"
  }, {
    path: "/teacher/:id",
    component: _98417aa2,
    name: "teacher-id"
  }, {
    path: "/",
    component: _5dc0e26a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
