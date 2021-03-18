<template>
  <article class="col-7 fl">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">

            <a href="javascript: void(0)" title="密码设置" class="current">
              密码设置
            </a>
          </section>
        </div>

        <!-- 手机号 -->
        <div style="margin-right: 10%;">
          <el-form label-width="30px" :model="params">
            <el-form-item class="input-prepend restyle no-radius" prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
              <div>
                <el-input type="text" placeholder="请输入绑定手机号" v-model="params.mobile" />
                <i class="iconfont icon-phone" />
              </div>
            </el-form-item>

            <!-- 验证码 -->
            <el-form-item class="input-prepend restyle no-radius" prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
              <div style="width: 100%;display: block;float: right;position: relative">
                <el-input type="text" placeholder="验证码" v-model="params.code" />
                <i class="iconfont icon-phone" />
              </div>
              <div class="btn" style="position:absolute;right: 0;top: 6px;width: 20%;">
                <a href="javascript:" type="button" @click="getCodeFun()" :value="codeTest" style="border: none;background-color: none">{{codeTest}}</a>
              </div>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item v-if="params.isUpdate" class="input-prepend" prop="oldPassword" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
              <div>
                <el-input  type="password" placeholder="输入旧密码" v-model="params.oldPassword" />
                <i class="iconfont icon-password" />
              </div>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
              <div>
                <el-input  v-if="params.isUpdate" type="password" placeholder="设置新密码" v-model="params.password" />
                <el-input  v-if="!params.isUpdate" type="password" placeholder="设置密码" v-model="params.password" />
                <i class="iconfont icon-password" />
              </div>
            </el-form-item>

            <el-form-item>
              <el-button :disabled="saveBtnDisabled" plain="true" type="primary" @click="submitChange()">修改</el-button>
            </el-form-item>
          </el-form>
        </div>

      </section>
    </div>
  </article>
</template>
<script>
  //引入调用login.js文件
  import loginApi from '@/api/login'
  //引入调用register.js文件
  import registerApi from '@/api/register'
  //引入调用js-cookie
  import cookie from 'js-cookie'
  import jwtDecode from "jwt-decode";

  export default {
    data() {
      return {
        token: '',
        loginInfo: {
          id: '',
          age: '',
          avatar: '',
          mobile: '',
          nickname: '',
          sex: ''
        },
        memberInfo: {
          id: '',
          age: '',
          avatar: '',
          mobile: '',
          nickname: '',
          sex: '',
          sign: '',
        },
        params: { //封装注册输入的数据
          id: '', //用户id
          mobile: '', //手机号
          code: '', //验证码
          nickname: '', //昵称
          password: '',
          oldPassword: '',
          isUpdate: true
        },
        sending: true, //是否发送验证码
        second: 60, //倒计时间
        codeTest: '获取验证码',
        saveBtnDisabled: false, //保存按钮是否禁用

      }
    },
    created() {
      //获取路径里面token值
      this.token = this.$route.query.token
      if (this.token) { //判断路径是否有token值
        this.wxLogin()
      }

      this.showInfoFromCookie()
    },

    methods: {
      //修改密码提交的方法
      submitChange() {
        loginApi.ChangePassword(this.params)
          .then(response => {
            if (response.data.code === 200){
              //提示注册成功
              this.$message({
                type: 'success',
                message: "操作成功! ✌"
              })
            //跳转到登陆页面
            this.$router.push({
              path: '/login'
            })
          }else {
              this.$message({
                type: 'success',
                message: response.data.msg
              })
            }
            })
      },

      //验证码
      //给已经输入的手机号发送验证码
      getCodeFun() {
        registerApi.sendCode(this.params.mobile)
          .then(response => {
            //提示发送验证码成功
            this.$message({
              type: 'success',
              message: "验证🐎已发送🆗"
            })
            //点完发送  60秒内不让再发
            this.sending = false
            //调用倒计时的方法
            this.timeDown()
          })
      },

      //定时器  发送验证码倒数
      timeDown() {
        let result = setInterval(() => { //setInterval定时器
          --this.second;
          this.codeTest = this.second
          if (this.second < 1) {
            clearInterval(result);
            this.sending = true;
            //this.disabled = false;
            this.second = 60;
            this.codeTest = "获取验证码"
          }
        }, 1000);
      },

      save() {
        loginApi.updataMemberInfo(this.memberInfo)
          .then(response => { //修改成功
            //提示成功
            this.$message({
              type: 'success',
              message: '修改成功！ 🧙‍♂️'
            });
            this.showInfoFromCookie()
          })
      },

      //从cookie中获取用户信息
      showInfoFromCookie() {
        //从cookie中获取用户信息
        var userStr = cookie.get("cloudstudy_ucenter")
        //userStr是字符串   需要转换为json对象
        if (userStr) {
          this.loginInfo = JSON.parse(userStr)
        }
        this.params.id = this.loginInfo.id;
        this.params.mobile = this.loginInfo.mobile
        if(this.loginInfo.mobile){
          this.params.isUpdate = true;
        }else{
          this.params.isUpdate = false;
        }
      },

      //微信登录显示的方法
      wxLogin() {
        //把token值放到cookie里面
        cookie.set('cloudstudy_token', this.token, {
          domain: 'localhost'
        })
        const s = jwtDecode(this.token).sub
        cookie.set('cloudstudy_ucenter',s,{domain: 'localhost'})
      },

    }
  }
</script>
