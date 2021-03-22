<template>

  <div>

    <div>
      <el-carousel indicator-position="outside" style="width: 100%" height="480px">
        <el-carousel-item v-for="banner in bannerList" :key="banner.id">
          <a target="_self" :href="banner.linkUrl">
            <img :src="banner.imageUrl" :alt="banner.title" width="100%" height="480px">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 幻灯片 开始 -->
<!--    <div v-swiper:mySwiper="swiperOption" >-->
<!--      <div class="swiper-wrapper banner">-->
<!--        &lt;!&ndash; 遍历bannerList 得到轮播图片 &ndash;&gt;-->
<!--        <div v-for="banner in bannerList" :key="banner.id" class="swiper-slide" :style="'background:' + banner.color">-->
<!--          <a target="_self" :href="banner.linkUrl">-->
<!--            <img :src="banner.imageUrl" :alt="banner.title">-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="swiper-pagination swiper-pagination-white"></div>-->
<!--      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>-->
<!--      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>-->
<!--    </div>-->
    <!-- 幻灯片 结束 -->

    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="course in courseList" :key="course.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img :src="course.cover" class="img-responsive" :alt="course.title">
                      <div class="cc-mask">
                        <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green" v-if="Number(course.price) === 0">
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
                      <span class="fr jgTag bg-green" v-else>
                        <i class="c-fff fsize12 f-fA"> ￥{{course.price}}</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{course.buyCount}} 人学习</i>
                        |
                        <i class="c-999 f-fA">{{course.viewCount}} 人浏览</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/course/" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">
                  <section class="i-teach-wrap" >
                    <div class="i-teach-pic">
                      <a :href="'/teacher/' +teacher.id" :title="teacher.name">
                        <img :alt="teacher.name" :src="teacher.avatar">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a :href="'/teacher/' +teacher.id" :title="teacher.name" class="fsize24 c-666 f-fH">{{teacher.name}}</a>
                    </div>
                    <div class="mt15 i-q-txt" style="height:40px">
                      <p class="c-999 f-fH">{{teacher.career}}</p>
                    </div>
                    <div class="mt15 i-q-txt" style="height: 130px">
                      <p class="c-999 f-fM">{{teacher.intro}}</p>
                    </div>
                  </section>
                </li>

              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/teacher/" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<script>
  //引入调用banner.js文件
  import bannerApi from '@/api/banner'
  //引入调用index.js文件
  import indexApi from '@/api/index'
  export default {
    data() {
      return {

        swiperOption: {
          //配置分页
          pagination: {
            el: '.swiper-pagination' //分页的dom节点
          },
          //配置导航
          navigation: {
            nextEl: '.swiper-button-next', //下一页dom节点
            prevEl: '.swiper-button-prev' //前一页dom节点
          }
        },
        bannerList: [], //banner数组
        courseList: [],
        teacherList: [],
      }
    },
    created() {
      //页面渲染时就调用banner查询 热门课程老师
      this.getBannerList()
      this.getHotCourse()
      this.getHotTeacher()
    },
    methods: {
      //查询热门课程
      getHotCourse() {
        indexApi.getHotCourse()
          .then(response => {
            this.courseList = response.data.data
          })
      },

      //查询名师
      getHotTeacher() {
        indexApi.getHotTeacher()
          .then(response => {
            this.teacherList = response.data.data
          })
      },

      //查询首页幻灯片数据
      getBannerList() {
        // bannerApi.getBannerList()
        //   .then(response => {
        //     this.bannerList = response.data.data.list
        //   })
        indexApi.getTopBannerAdList()
          .then(response => {
            this.bannerList = response.data.data
          })
      },
    }
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>


