<template>
  <div class="login_container">
      <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
          <img src="../assets/logo.png" alt="">
        </div>
        <!-- 登录表单区域 ref="loginFormRef"代表这个表单的实例对象-->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
          <!-- 用户名 -->
          <el-form-item  prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-s-goods" type="password"></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
             <el-button type="primary" @click="login">登录</el-button>
              <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      // console.log(this.$refs.loginFormRef.resetFields)
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        // 因为我们在main.js中配置了axios为Vue的原型对象的$http属性，所以这里我们可以用this.$http来发起请求
        const { data: res } = await this.$http.post('login', this.loginForm)
        console.log(res)
        // this.$http.post('login', this.loginForm)我们发现这个返回的是promise函数，所以需要用async
        // 注：新知识点：1、如果我们拿到的数据有多项属性，呢么我们可以用解构的方法来精确的拿到某一项数据,
        // 2、如果遇到返回的是promise函数，就需要用async和await来写
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功！')
        // 这里我们需要把登录成功后获取到的token保存到客户端的sessionStorage中
        // token是后端返回过来的参数
        window.sessionStorage.setItem('token', res.data.token)
        // 登录成功之后，通过编程式导航跳转道后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
      width:450px;
      height: 300px;
      background-color: #fff;
      border-radius: 3px;
      position: absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      .avatar_box {
        height: 130px;
        width: 130px;
        border:1px solid #eee;
        border-radius: 50%;
        padding:10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left:50%;
        transform:translate(-50%,-50%);
        background-color: #fff;
        img{
          width:100%;
          height:100%;
          border-radius: 50%;
          background-color: #eee;
        }
      }
    }
    .login_form{
      position: absolute;
      bottom:0;
      width:100%;
      padding:0 20px;
      box-sizing: border-box;
    }
    .btns{
      display: flex;
      justify-content: flex-end;
    }
</style>
