<template>
    <div>
        <el-form  v-if="!summitFormVisiable" status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
            <el-form-item label="原邮箱" prop="email" >
                <span>{{ruleForm.email}}</span>
            </el-form-item>
            <el-form-item label="验证码" prop="checkCode" >
                <el-row>
                    <el-col :span="14">
                        <el-input  v-model="ruleForm.checkCode" autocomplete="off"></el-input>
                    </el-col>
                    <el-col :span="8" :offset="2">
                        <el-button size="small" type="primary" @click="getCheckCode" :disabled="startCountDown">{{startCountDown ? `获取原邮箱验证码(${countDown})`:'获取原邮箱验证码'}}</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="next()">下一步</el-button>
            </el-form-item>
        </el-form>

        
        <el-form  v-if="summitFormVisiable"  status-icon  :model="newForm" :rules="rules" ref="newForm" label-width="100px">
            <el-form-item label="新邮箱"  prop="email">
                <el-input  v-model="newForm.email" autocomplete="off"></el-input>
            </el-form-item>           
            <el-form-item label="验证码" prop="checkCode" >
                <el-row>
                    <el-col :span="14">
                        <el-input  v-model="newForm.checkCode" autocomplete="off"></el-input>
                    </el-col>
                    <el-col :span="8" :offset="2">
                        <el-button size="small" type="primary" @click="getCheckCode" :disabled="startCountDown">{{startCountDown ? `获取新邮箱验证码(${countDown})`:'获取新邮箱验证码'}}</el-button>
                    </el-col>          
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交新邮箱</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    props:{
        email:{
            type:String,
            default:''
        }
    },
    data() {
           
        return {
            summitFormVisiable:false,
            ruleForm: {
                checkCode: '',
                email: '',      
            },
            newForm:{
                email:'',
                checkCode:''     
            },
            startCountDown:false,
            countDown:60,
            timer:null,
            rules:{
                checkCode:[
                    {required:true,message:'请输入验证码',trigger:'blur'}
                ],
                 email:[
                    {required:true,message:'请输入邮箱',trigger:'blur'},
                    { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
                ]
            }
        };
    },

    created(){
        
        this.ruleForm.email = this.email
    },
    
    methods: {
        init(){
            this.summitFormVisiable = false
            this.newForm = {
                email:'',
                checkCode:''     
            }
            this.ruleForm.checkCode = ''
        },
        //获取验证码
        getCheckCode(){
            //  this.$API.getValidCode().then((res) => {
            //    if(res.data.errorcode === 1){
            //     this.tableData = res.data.data.data_list
            //     this.total = res.data.data.num_results
            //    }
            // })
            
            let that = this 
            clearInterval(that.intervalId)
            that.startCountDown = true 
            that.countDown = 60
            that.intervalId = setInterval(() => {
                if(that.countDown  > 0){
                    that.countDown --
                }else{
                    that.startCountDown = false
                    clearInterval(that.intervalId)
                }
            },1000)              
        },
        //下一步
        next(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    //校验验证码是否正确

                    this.startCountDown = false            
                    this.summitFormVisiable = true          
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        //提交新邮箱
        submitForm() {
            this.$refs.newForm.validate((valid) => {
                if (valid) {
                    //  this.$API.updateEmail(this.newForm).then((res) => {
                    //    if(res.data.errorcode === 1){
                    //     this.tableData = res.data.data.data_list
                    //     this.total = res.data.data.num_results
                    //    }
                    // })
                } 
            });
        },
       
    },

   
    beforeDestroy(){
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