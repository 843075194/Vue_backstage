<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/heima.png" alt="">
                <span>桃子家的后台管理</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主题区域 -->
        <el-container>
            <!-- 侧边栏部分 -->
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单区域 -->
                <el-menu background-color="#333744" text-color="#fff"
                active-text-color="#409EFF" :unique-opened="true" :collapse='isCollapse'
                :collapse-transition='false' :router="true" :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                        <!-- 一级菜单的模块区 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.path]"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children"
                        :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                            <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-menu"></i>
                            <!-- 文本 -->
                            <span>{{subItem.authName}}</span>
                        </template>
                        </el-menu-item>
                    </el-submenu>
                    </el-menu>
            </el-aside>
            <!-- 右侧主体内容 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        users: 'iconfont icon-user',
        rights: 'iconfont icon-tijikongjian',
        goods: 'iconfont icon-shangpin',
        orders: 'iconfont icon-danju',
        reports: 'iconfont icon-baobiao'
      },
      // el-menu侧边栏菜单是否折叠,默认是不折叠，false
      isCollapse: false,
      // 对应saveNavState() ，存储保存在saveNavState中的activePath路径
      activePath: ''
    }
  },
  created () { // 挂载数据，绑定事件等等
    this.getMenuList()
    // 这一步只是为了当刷新之后  之前点击的那一项还是保持高亮显示
    // 也是为了保持页面在刷新后还是当前的页面，因为路由对应当前的组件
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList () {
    //  1、因为请求到的是一个promise对象，所以我们这里用then来接收
    //   this.$http.get('menus').then(res => {
    //     console.log(res)
    //   })
    //  2、用asait语法糖的格式来写
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    saveNavState (path) {
      // path拿到的值就是('/'+subItem.path) ==>  /users这样的形式
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container{
    height: 100%;
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center; // 为了不让按钮是撑满高度的
    color:#fff;
    font-size:20px;
    > div{
        display: flex;
        align-items: center; // 为了让文字居中对齐
        span {
            margin-left: 15px;
        }
    }
}
.el-aside{
    background-color: #333744;
    .el-menu{
        border-right:none;
    }
}
.el-main{
    background-color: #EAEDF1;
}
.iconfont{
    margin-right: 10px;
}
.toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color:#fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor:pointer;
}
</style>
