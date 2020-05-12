<template>
    <div class="flex-between">
        <div class="flex-between">        
            <el-form ref="form" :model="form"  :rules="rules" label-width="80px">
                <el-form-item label="组织" >
                    <span>{{form.group}}</span>
                </el-form-item>          
                <el-form-item label="用户名"  prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱"  prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-button size="mini" type="primary" @click="resetPwd">重置</el-button><span>注：重置后密码为邮箱名</span>
                </el-form-item>
                <el-form-item label="账户类型" >
                    <span>{{form.type | userTypeFilter}}</span>
                </el-form-item>
                <el-form-item label="权限说明"  >
                    <!-- 奥比root-->
                    <template v-if="form.type === '1'">
                        <div> a、设备管理</div> 
                        <div> b、模型管理</div> 
                        <div> c、账户管理</div> 
                    </template>
                    <!-- 奥比admin-->
                    <template v-else-if="form.type === '2'">
                        <div> a、设备管理</div> 
                        <div> b、模型管理</div> 
                    </template>
                    <!-- 组织root-->
                    <template v-else-if="form.type === '3'">
                        <div> a、设备管理</div> 
                        <div> b、内容配置</div> 
                        <div> b、模型管理</div> 
                        <div> c、账户管理</div> 
                    </template>
                    <!-- 组织admin-->
                    <template v-else>
                        <div> a、设备管理</div> 
                        <div> b、内容配置</div> 
                        <div> b、模型管理</div> 
                    </template>
                </el-form-item>
                                                
            </el-form>         
            <UploadPhoto :imageUrl="form.img" @success="success"></UploadPhoto>              
        </div> 
        <div>
            <el-button type="primary" @click="submit"> 提交</el-button>
            <el-button @click="back">取消</el-button>
        </div>
</div>    
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            form:{
                group:'',
                username:'',
                email:'',
                type:'',
                img:''
            },
            file:File,
            rules:{
                username:[
                    {required:true,message:'请输入用户名',trigger:'blur'}
                ],
                 email:[
                    {required:true,message:'请输入邮箱',trigger:'blur'},
                    { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
     computed:{
      ...mapState({ 
          userType:state=>state.userType ,
        }),        
    },
    watch:{
        $route: {
            handler: function(val, oldVal){ 
                if(val !== oldVal){
                    this.init()
                }
              
            },
            // 深度观察监听
            deep: true
        } 
    },
    created(){

        this.init()
    },
    methods:{
        init(){
            this.form = this.$route.params.userInfo
        },
        submit(){

        },
        back(){
            this.$router.back(-1)
        },

        resetPwd(){
              this.$confirm('此操作将重置密码为邮箱地址, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                  this.$API.updatePwd(this.form.email).then((res) => {
                    if(res.data.errorcode === 1){
                      this.$message.success('重置密码成功')    
                    }else{
                      this.$message.error(res.message);
                    } 
                  })
            });  
         
        },
        success(event){
            this.file = event
        }
    }
}
</script>

<style scoped>
   
    .el-form{
        width: 500px;
    }
 

</style>