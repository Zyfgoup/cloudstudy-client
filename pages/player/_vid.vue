<template>
  <div>
    <!-- 阿里云视频播放器组件 -->
    <script charset="utf-8" src="https://player.alicdn.com/aliplayer/presentation/js/aliplayercomponents.min.js"></script>
    <!-- 阿里云视频播放器样式 -->
    <script charset="utf-8" src="https://g.alicdn.com/de/prismplayer/2.8.8/aliplayer-min.js"></script>
    <!-- 阿里云视频播放器脚本 -->

    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.9.3/skins/default/aliplayer-min.css" />
    <script type="text/javascript" charset="utf-8" src="https://g.alicdn.com/de/prismplayer/2.9.3/aliplayer-min.js"></script>

    <!-- 定义播放器dom -->
    <div >
      <div id="J_prismPlayer" class="prism-player" s/>
    </div>

    <!-- /课程封面介绍 -->
    <div class="mt20 c-infor-box">
      <article class="fl col-7">
        <section class="mr30">
          <div class="i-box">
            <div>
              <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                <a name="c-i" class="current" title="课程详情">课程详情</a>
              </section>
            </div>
            <article class="ml10 mr10 pt20">
              <div>
                <h6 class="c-i-content c-infor-title">
                  <span>课程介绍</span>
                </h6>
                <div class="course-txt-body-wrap">
                  <section class="course-txt-body">
                    <!-- v-html 翻译web语言 -->
                    <p v-html="courseWebVo.description">{{courseWebVo.description}}</p>
                  </section>
                </div>
              </div>
              <!-- /课程介绍 -->
              <div class="mt50">
                <h6 class="c-g-content c-infor-title">
                  <span>课程大纲</span>
                </h6>
                <section class="mt20">
                  <div class="lh-menu-wrap">
                    <menu id="lh-menu" class="lh-menu mt10 mr10">
                      <ul>
                        <!-- 文件目录 -->
                        <li class="lh-menu-stair" v-for="chapter in chapterVideoList" :key="chapter.id">
                          <a href="javascript: void(0)" :title="chapter.title" class="current-1">
                            <em class="lh-menu-i-1 icon18 mr10"></em>{{chapter.title}}
                          </a>

                          <ol class="lh-menu-ol" style="display: block;">
                            <li class="lh-menu-second ml30" v-for="video in chapter.children" :key="video.id">

                              <a :href="'/player/'+video.videoSourceId+','+courseId"
                                 v-if="isBought || Number(courseWebVo.price) === 0"
                                 :title="video.title">
                                <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                <el-tag style="float: right" type="warning" v-if="video.videoSourceId === videoId">当前学习</el-tag>
                              </a>

                              <a v-else-if="video.isFree === true"
                                 :href="'/player/'+video.videoSourceId+','+courseId"
                                 :title="video.title">
                                  <span class="fr">
                                    <i class="free-icon vam mr10">免费试听</i>  <el-tag type="warning" v-if="video.videoSourceId === videoId">当前学习</el-tag>
                                  </span>
                                <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                              </a>

                              <a
                                v-else
                                :title="video.title">
                                <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                <el-tag type="warning" v-if="video.videoSourceId === videoId">当前学习</el-tag>
                              </a>

                            </li>
                          </ol>
                        </li>
                      </ul>
                    </menu>
                  </div>
                </section>
              </div>
              <!-- /课程大纲 -->
            </article>
          </div>
        </section>
      </article>
      <aside class="fl col-3">
        <div class="i-box">
          <div>
            <section class="c-infor-tabTitle c-tab-title">
              <a title href="javascript:void(0)">主讲讲师</a>
            </section>
            <section class="stud-act-list">
              <ul style="height: auto;">
                <li>
                  <div class="u-face">
                    <a href="#">
                      <img :src="courseWebVo.avatar" width="50" height="50" alt>
                    </a>
                  </div>
                  <section class="hLh30 txtOf">
                    <a class="c-333 fsize16 fl" :href="'/teacher/'+courseWebVo.teacherId">{{courseWebVo.teacherName}}</a>
                  </section>
                  <section class="hLh20 txtOf">
                    <span class="c-999">{{courseWebVo.intro}}</span>
                  </section>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </aside>
      <div class="clear"></div>
    </div>

    <!-- 课程评论 -->
    <div class="mt50 commentHtml">
      <div>
      <h6 class="c-c-content c-infor-title" id="i-art-comment">
        <span class="commentTitle">课程评论</span>
      </h6>
      <section class="lh-bj-list pr mt20 replyhtml">
        <ul>
          <li class="unBr">
            <aside class="noter-pic">
              <img width="50" height="50" class="picImg" src="~/assets/img/loading.gif">
            </aside>
            <div class="of">
              <section class="n-reply-wrap">
                <fieldset>
                  <textarea name="" v-model="comment.content" placeholder="输入您要评论的文字" id="commentContent"></textarea>
                </fieldset>
                <p class="of mt5 tar pl10 pr10">
                  <span class="fl "><tt class="c-red commentContentmeg" style="display: none;"></tt></span>
                  <input type="button" @click="init3()" value="评论" class="lh-reply-btn">
                </p>
              </section>
            </div>
          </li>
        </ul>
      </section>
      <section class="">
        <section class="question-list lh-bj-list pr">
          <ul class="pr10">
            <li v-for="(comment,index) in data.items" v-bind:key="index">
              <aside class="noter-pic">
                <img width="50" height="50" class="picImg" :src="comment.avatar">
              </aside>
              <div class="of">
                          <span class="fl">
                          <font class="fsize12 c-blue">
                            {{comment.nickname}}</font>
                          <font class="fsize12 c-999 ml5">评论：</font>
                          </span>
              </div>
              <div class="noter-txt mt5">
                <p>{{comment.content}}</p>
              </div>
              <div class="of mt5">
                <div style="text-align: right;">
                  <input type="button" @click="deleteComment(comment.id)" value="删除" class="lh-reply-btn">
                </div>
              </div>

              <div class="of mt5">
                <span class="fr"><font class="fsize12 c-999 ml5">{{comment.createTime}}</font></span>
              </div>

            </li>

          </ul>
        </section>
      </section>

      <!-- 公共分页 开始 -->
      <div class="paging">
        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="首页"
          @click.prevent="gotoPage(1)">首</a>
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="前一页"
          @click.prevent="gotoPage(data.current-1)">&lt;</a>
        <a
          v-for="page in data.pages"
          :key="page"
          :class="{current: data.current == page, undisable: data.current == page}"
          :title="'第'+page+'页'"
          href="#"
          @click.prevent="gotoPage(page)">{{ page }}</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="后一页"
          @click.prevent="gotoPage(data.current+1)">&gt;</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="末页"
          @click.prevent="gotoPage(data.pages)">末</a>
        <div class="clear"/>
      </div>
      <!-- 公共分页 结束 -->
    </div>

  </div>
  </div>
</template>
<script>
//引入调用vod.js文件
import vodApi from '@/api/vod'
//引入调用course.js文件
import courseApi from '@/api/course'
//引入调用collect.js文件
import collectApi from '@/api/collect'
//引入调用order.js文件
import orderApi from '@/api/order'
//引入调用comment.js文件
import commentApi from '@/api/comment'
import cookie from "js-cookie";

export default {
    layout: 'default',//应用video布局
    async asyncData({params, error}) {
      const ids = params.vid.split(",")
      console.log(ids);
      let [response1, response2] = await Promise.all([
        vodApi.getPlayAuth(ids[0]),
        courseApi.getCourseInfo(ids[1])
      ])
      return {
        playAuth: response1.data.data,
        videoId: ids[0],
        courseId: ids[1],
        courseWebVo: response2.data.data.courseWebVo,
        chapterVideoList: response2.data.data.chapterVideoList
      }


      // return vodApi.getPlayAuth(ids[0])
      //  .then(response => {
      //    console.log(response.data)
      //      return {
      //          playAuth: response.data.data,
      //          videoId: params.vid
      //      }
      //  })
    },

  data() {
    return {

      isBought: false,  // 是否已购买
      isComment: false ,// 是否是该用户的评论
      // 分页组件
      data:{},
      page:1,
      limit:4,
      total:10,
      // 评论
      comment:{
        content:'',
        courseId:'',
        nickname:'',
        avatar:'',
      },
    }
  },

  created() {
    const token = cookie.get('cloudstudy_token')
    // 如果未登录，则isBought=false
    // 如果已登录，则判断是否已购买
    if (token) {
      orderApi.isBought(this.courseWebVo.id).then(response => {
        this.isBought = response.data.data
      })
      }

    this.initComment()

  },

  methods: {


    //初始化评论,获取评论列表
    initComment(){
      commentApi.getPageList(this.page, this.limit, this.courseWebVo.id).then(response => {
        this.data = response.data.data
      })

    },

    init3(){
      //判断是否登录
      const token = cookie.get('cloudstudy_token')
      // 如果未登录，提示登录
      if (token) {
        this.addComment()
      }else{
        this.$message({
          type: 'error',
          message: '请先登录️再进行下一步操作'
        });
        //vue路由跳转
        this.$router.push({
          path: '/login'
        })
      }
    },

    //添加评论
    addComment(){
      this.comment.courseId = this.courseWebVo.id
      this.comment.teacherId = this.courseWebVo.teacherId
      commentApi.addComment(this.comment).then(response => {
        if(response.data.code === 200){
          this.comment.content = ''
          this.initComment()
        }
      })
    },

    //删除评论
    deleteComment(commentId){
      this.$confirm('确认要删除当前评论吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return commentApi.deleteComment(commentId)
      }).then((response) => {
        this.initComment()
        this.$message({
          type: 'success',
          message: '删除成功✌',
        })
      }).catch(error => {
        if (error === 'cancel') {
          this.$message({
            message: '取消删除'
          })
        }
      })
    },

    //跳转页面
    gotoPage(page){
      commentApi.getPageList(page, this.limit,this.courseId).then(response => {
        this.data = response.data.data
      })
    },
  },



    //页面渲染之后
    mounted() {
        new Aliplayer({
            id: 'J_prismPlayer',
            vid: this.videoId, // 视频id
            playauth: this.playAuth, // 播放凭证
            encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
            width: '100%',
            height: '500px',
            // 以下可选设置
            //cover: 'https://edu-zjm.oss-cn-beijing.aliyuncs.com/banner/videoplayer.jpg', // 封面
            qualitySort: 'asc', // 清晰度排序

            mediaType: 'video', // 返回音频还是视频
            autoplay: false, // 自动播放
            isLive: false, // 直播
            rePlay: false, // 循环播放
            preload: true,
            controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
            useH5Prism: true, // 播放器类型：html5
            components: [{
                name: 'BulletScreenComponent', // 跑马灯组件
                type: AliPlayerComponent.BulletScreenComponent,
                /** 跑马灯组件三个参数 text, style, bulletPosition
                   * text: 跑马灯文字内容
                   * style: 跑马灯样式
                   * bulletPosition: 跑马灯位置, 可选的值为 'top' (顶部), 'bottom' (底部), 'random' (随机), 不传值默认为 'random'
                   */
                args: ['欢迎来到CloudStudy', { fontSize: '18px', color: '#ffaa00' }, 'random']
            },]
        }, function(player) {
            console.log('播放器创建成功')
        })
    }
}

</script>
