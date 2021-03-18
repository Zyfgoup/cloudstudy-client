<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f18">购物车</h1>
      <!-- <img src="~/assets/img/cart_setp2.png" class="fr"> -->
      <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
      <el-table
        :data="cartList"
        style="width: 100%">
        <el-table-column
          label="课程"
          width="400px" align="center">
          <template slot-scope="scope">
            <div class="info">
              <div class="pic">
                <a  target="_blank" :href="'http://localhost:3000/course/'+scope.row.courseId">
                <img :src="scope.row.cover" alt="scope.row.title" width="200px"/>
                </a>
              </div>
              <div class="title">
                <a  target="_blank" :href="'http://localhost:3000/course/'+scope.row.courseId" style="font-size: 16px;font-weight: bold">{{ scope.row.title }}</a>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="teacherName"
          label="讲师"
          width="180" align="center">
          <template slot-scope="scope">
            <div class="info">
              <a  target="_blank" :href="'http://localhost:3000/teacher/'+scope.row.teacherId" style="font-size: 16px;font-weight: bold">{{ scope.row.teacherName }}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
        align="center">
        </el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="Finish">
        <div class="fr" id="AgreeDiv">
          <el-checkbox v-model="agree">我已阅读并同意<a href="javascript:" target="_blank">《云上学购买协议》</a></el-checkbox>
        </div>
        <div class="clear"></div>
        <div class="Main fl" style="width: 100%">
          <div class="fl">
            <a :href="'/course'"><i class=" el-icon-d-arrow-left"></i>全部课程</a>
          </div>
          <div class="fr">
            <p>共 <strong class="red">{{amount}}</strong> 件商品，合计<span class="red f20">￥<strong
              id="AllPrice">{{totalPrice}}</strong></span></p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore">
        <el-button v-if="amount>0" style="float: right" :disabled="!agree" type="danger" id="submitPay" @click="toPay()">去支付</el-button>
        <div class="clear"></div>
      </div>
    </form>
  </div>
</template>
<script>
  import cartApi from '@/api/cart'
  import orderApi from '@/api/order'
  import cookie from "js-cookie";
  import { Message } from "element-ui";
  export default {
    data() {
      return {
        cartList: [],
        amount: '',
        totalPrice: '',
        agree: true,
        timer: ''
      }
    },
    created() {
      //判断是否登录
      const token = cookie.get('cloudstudy_token')
      // 如果未登录，提示登录
      if (token) {
        this.getCartList();
      } else {
        Message.error("请先登录")
        //vue路由跳转
        this.$router.push({
          path: '/login'
        })
      }
    },
    destroyed: function () {
      clearInterval(this.timer)
    },

    methods: {
      //获取订单信息
      getCartList() {
        cartApi.getList()
          .then(response => {
            this.cartList = response.data.data.cartList
            this.amount = response.data.data.amount
            this.totalPrice = response.data.data.totalPrice
          })
      },

      removeDataById(id) {
        cartApi.removeById(id).then(response => {
          this.$message({
            type: 'success',
            message: '移除成功'
          });
        })
        this.getCartList();
      },

      //去支付
      toPay() {
        this.createOrders();
      },

      //生成订单
      createOrders() {
        orderApi.createOrdersByCart(this.cartList)
          .then(response => {
            //获取返回订单号
            //生成订单之后，跳转订单显示页面
            const orderNo = response.data.data;
            this.timer = setInterval(() => {
              this.getPay(orderNo)
            }, 300);
          })
      },

      getPay(orderNo){
        orderApi.getOrderListByOrdeoNo(orderNo).then(response=>{
          if(response.data.code === 200){
            const flag = response.data.data;
            if(flag === true){
              clearInterval(this.timer);
              console.log(flag)
              this.$router.push({
                path: '/shopCar/' + orderNo
              })
            }else{
              Message.warning("生成订单中！！！")
            }
          }
        })
      }

    },





  }
</script>
