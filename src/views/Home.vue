<template>
  <div name="home">
  
    <el-container>
      <el-aside width="200px">
         <Submenu :menuNam="menuNam"></Submenu>
      </el-aside>
      <el-container>
        <el-header>      
          <div class="flex_between">
               <div>{{groupName}} </div>  
              <div class="flex_between right_item">
                <div><i class="el-icon-s-help"></i>使用指南</div>
                <div>
                  <el-dropdown @command="handleCommand">
                    <span >
                      <i class="el-icon-user-solid"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" > 
                      <el-dropdown-item command="personal_info"> 个人信息</el-dropdown-item>
                      <el-dropdown-item command="update_pwd">修改密码</el-dropdown-item>
                      <el-dropdown-item command="update_email">修改邮箱</el-dropdown-item> 
                      <el-dropdown-item command="login_out">安全退出</el-dropdown-item>               
  
                    </el-dropdown-menu>
                  </el-dropdown>                
                  {{loginName}}
                </div>
              </div>
          </div>      
        </el-header>
        <el-main>
           <Breadcrumb></Breadcrumb> 
           <el-card >
                <router-view /> 
            </el-card> 
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Submenu from '@/components/Submenu.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import {mapState,mapGetters, mapMutations} from 'vuex'
export default {

  components:{
        Submenu,
        Breadcrumb
  },
    data () {
      return {
        menuNam:'',
      }
    },
    computed:{
      ...mapState({ 
          loginName:state=>state.loginName ,
          groupName:state=>state.groupName ,
        }),        
    },
    
    created(){
      this.menuNam = 'home'
   
      },

      methods:{
      ...mapMutations([
        'setLoginName',
        'setTOKEN'
      ]),
    
      handleCommand(command){
          if(command === 'login_out'){
            this.loginOut()
          }else{
             this.$router.push({ name: 'user-info' ,query: {type:command}})
          }
      },
    
      loginOut(){
        this.setLoginName("")
        this.setTOKEN("")
        this.$router.push({ path: '/login' })
        this.$API.logout()
      },
   
    
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >



.el-header {
    background-color: #FFFFFF;
    color: #333;
    text-align: left;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #002140;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #F0F2F5;
    text-align: left;
    color: #333;
    min-height: calc(100vh - 60px);
  
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .flex_between{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
  }


  .right_item div{
    margin-right: 20px;
  }
  .right_item i{
    margin-right:10px;
  }

 

</style>
