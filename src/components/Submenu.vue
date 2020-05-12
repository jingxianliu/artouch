<template>
    <el-menu class="el-menu-vertical-demo"
        @select="handleSelect"
         :collapse="isCollapse"
         :mode="menuMode"
         :router="isRouter"
         :unique-opened ="isUniqueOpended"
         :default-active ="defaultActive"
     >
         <div class="border-bottom">
              
        </div>  
        <template v-for="(item,i) in navList">
            <!-- 一级菜单（有子菜单） -->
            <el-submenu v-if="item.children && item.children.filter(item => item.meta.leftMenu === true).length > 0"  :key="i"  :index="item.path">
                <template slot="title">
                    <i :class="item.meta.icon"></i>
                    <span>{{ item.meta.title   }}</span>
                </template> 
                <!-- 存在二级菜单 -->
                <template v-if="item.children && item.children.filter(item => item.meta.leftMenu === true).length > 0">
                    <template v-for="(children,n) in item.children">
                         <!-- 二级菜单（有子菜单,并且是需要显示的） -->
                        <el-submenu  v-if="children.children  && children.children.filter(item => item.meta.leftMenu === true).length > 0" :key="`${i}-${n}`" :index="children.path">
                            <template slot="title">{{children.meta.title   }}</template>
                            <!-- 三级菜单 -->
                            <el-menu-item  v-for="(childrenItem,p) in children.children.filter(item => item.meta.leftMenu === true)" :key="`${i}-${n}-${p}`" :index="childrenItem.path">
                                {{ childrenItem.meta.title  }}
                            </el-menu-item>
                        </el-submenu>
                        <!-- 二级菜单（无子菜单） -->
                        <el-menu-item v-else :key="`${i}-${n}`" :index="children.path">{{  children.meta.title  }}</el-menu-item>

                    </template>
                </template>      
            </el-submenu>               
            
            <!-- 一级菜单（无子菜单或者子菜单不需要在左侧显示） -->
            <el-menu-item v-else  :key="i" :index="item.path">
                <i  :class="item.meta.icon"></i>
                <span  slot="title">{{ item.meta.title   }}</span>       
            </el-menu-item>  
        </template>      
       
    </el-menu>         
</template>

<script>
import {mapState} from 'vuex'

export default {
 props: {
     menuNam:{
        type: String,
        default: 'home'
     },
     menuMode:{
        type: String,
        default: 'vertical'
     },

     isUniqueOpended:{
        type: Boolean,
        default: true
     },
     isRouter:{
        type: Boolean,        
        default: false
     },
    isCollapse:{
        type: Boolean,
        default: false
     }, 
    },
  data () {
    return {
      navList:[],
      defaultActive:''
    }
  },
  watch: {
   
    $route:function(){   
      
        //匹配路由
        //this.defaultActive = this.$route.matched.filter(route => route.name === this.$route.name)[0].path
        this.defaultActive = this.$route.matched.filter(route => route.meta.leftMenu === true && !route.redirect)[0].path
    }
  },
    computed:{
      ...mapState({ 
          userType:state=>state.userType ,
        }),        
    },
  created(){    
        //获取路由信息
      let router =   this.$router.options.routes
      this.navList = router.filter(item => item.name === this.menuNam)[0].children    
      this.navList  = this.navList.filter(item => item.meta.type === 'all' || item.meta.type === this.userType)  
      this.init()
    },
    methods:{
        init(){
            this.defaultActive = '/home'
            this.$router.push('/home')
        },
        //跳转路由
        handleSelect(key, keyPath){    
            if(!this.routerFlg){
                this.$router.push(key)
            }
            
        }
    }

}
</script>

<style scoped>
    .el-menu{
        text-align: center;
        background-color: #002140 ;
        color: #A6A6A6;
    }
  
     /deep/ .el-submenu>.el-menu,.el-submenu__title {
        background-color: #000000;
    }
 
     /deep/.el-submenu__title{
        color: #ffffff;
    }
 
    /deep/.el-menu-item:focus, /deep/ .el-submenu__title:focus, /deep/ .el-menu-item:hover,/deep/  .el-submenu__title:hover{
        background-color: #1890FF;
    }
  
    /deep/.el-menu-item,.el-menu-item.is-active,.el-menu .el-menu-item.is-active,.el-menu-item i,.el-submenu__title,.el-submenu__title i{
        color: #FFFFFF ;
    }
       
    .border-bottom{
        border-bottom: 1px solid #DEDEDE;
        height: 100px;
    }
    .border-top{
        border-top: 1px solid #DEDEDE;
    }
</style>
