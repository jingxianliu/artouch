<template>
    <div>
        <el-form   status-icon  :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" >
            <el-form-item label="原邮箱" >
                <span>{{ruleForm.email}}</span>
            </el-form-item>
            <el-form-item label="验证码" prop="checkCode" >
                <el-row>
                    <el-col :span="14">
                        <el-input  v-model="ruleForm.checkCode" autocomplete="off" ></el-input>
                    </el-col>
                    <el-col :span="8" :offset="2">
                        <el-button size="small" type="primary" @click="getCheckCode" :disabled="startCountDown">{{startCountDown ? `获取原邮箱验证码(${countDown})`:'获取原邮箱验证码'}}</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="新密码" prop="password" required >
                <el-input type="password" v-model="ruleForm.password"  auto-complete="new-password"></el-input>
            </el-form-item>
            <el-form-item label="密码确认"  prop="confirm_password" required>
                <el-input type="password" v-model="ruleForm.confirm_password"  auto-complete="new-password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交新密码</el-button>
            </el-form-item>
        </el-form>
       
    </div>
</template>

<script>
 import { mapMutations } from 'vuex';
  export default {
    props:{
        email:{
            type:String,
            default:''
        }
    },
    data() {
      
       var validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.confirm_password !== '') {
            this.$refs.ruleForm.validateField('confirm_password');
          }
          callback();
        }
      };

      var validatePassConfirmPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      
      return {
        summitFormVisiable:false,
        ruleForm: {
          checkCode: '',
          email: '',      
          password:'',
          confirm_password:''
        },     
        startCountDown:false,
        countDown:60,
        intervalId:null,
        rules: {
          checkCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
           password: [           
            { validator: validatePwd, trigger: 'blur' }
          ],
           confirm_password: [
            { validator: validatePassConfirmPwd, trigger: 'blur' }
          ],
     
        }
      };
    },
    created(){
        this.init()
    },
   
    methods: {
      ...mapMutations([
        'setLoginName',
        'setToken'
      ]),
        init(){
            this.ruleForm = {
                checkCode: '',
                email: this.email,      
                password:'',
                confirm_password:''
            }
        },
        getCheckCode(){
          let that = this 
          clearInterval(that.intervalId)
          that.startCountDown = true 
          that.countDown = 10
          that.intervalId = setInterval(() => {
              if(that.countDown  > 0){
                that.countDown --
                console.log(`获取新邮箱验证码(${that.countDown})`)
              }else{
                 that.startCountDown = false
                  clearInterval(that.intervalId)
              }
          },1000)              
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            this.$message.success('修改密码成功，请重新登陆')
            setTimeout( () =>{
              this.setLoginName("")
              this.setTOKEN("")
              this.$router.push({ path: '/login' })
            },3000)
            
            //  this.$API.updatePwd(this.ruleForm).then((res) => {
            //    if(res.data.errorcode === 1){
            //     this.tableData = res.data.data.data_list
            //     this.total = res.data.data.num_results
            //    }
            // })
          } 
        });
      },
     
    },
    beforeDestroy() {
       clearInterval(this.intervalId) //关闭
       this.intervalId = null
    }
  }
</script>

<style scoped>
    .el-form{
        width: 500px;
        text-align: left;
    }
</style>