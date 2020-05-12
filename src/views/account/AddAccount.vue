<template>
    <div class="form-item">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="组织" prop="group" v-if="userType === '1'">
                <el-input v-model="form.group"></el-input>
            </el-form-item>
            <el-form-item label="组织" prop="group" v-if="userType === '3'">
                <span>{{groupName}}</span>
            </el-form-item>
            <el-form-item label="用户名"  prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <span>新增组织密码默认为邮箱</span>
            </el-form-item>            
        </el-form>  
        <div>
            <el-button type="primary" @click="addAccount">提交</el-button>
            <el-button @click="back">取消</el-button>
        </div>
    </div>      
</template>

<script>
import {mapState,mapGetters, mapMutations} from 'vuex'

export default {
    data(){
         var validateEmail = (rule, value, callback) => {
            let reg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
            if (value === '') {
            callback(new Error('请再次输入邮箱'));
            } else if (!reg.test(value)) {
            callback(new Error('邮箱格式不正确'));
            } else {
            callback();
            }
         };
        return{
           
            form:{
                group:'',
                username:'',
                email:'',
                password:'',
                type:'3'
            },
            rules:{
                 group: [
                    { required: true, message: '请输入组织名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur' },
                    {validator:validateEmail,trigger: 'blur'}
                ],
                          
            },
            type:''

        }
    },
    watch: {
        $route: {
            handler: function(val, oldVal){ 
                if(val !== oldVal){
                  
                }
              
            },
            // 深度观察监听
            deep: true
        }  
    },
    computed:{
      ...mapState({ 
          userType:state=>state.userType ,
          groupName:state=>state.groupName
        }),        
    },
    created(){
        this.type = this.$route.params.type
        if(this.type === '3'){
            this.form.group = groupName
        }
    },
    methods:{
        addAccount(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.form.password = this.form.email        
                    if(this.userType === '1'){
                        if(this.type = 'group'){ //添加组织
                            this.form.type = '3'
                        }else if(this.type = 'admin'){ //添加奥比一级管理员
                            this.form.type = '2'
                        } 
                    }else if(this.userType === '3'){
                        this.form.type = '4'
                    }    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        back(){
            this.$router.back(-1)
        }
    }
}
</script>

<style scoped>
    .form-item{
        display: flex;
        justify-content: space-between;
    }
    .el-form{
        width: 500px;
    }
  

</style>