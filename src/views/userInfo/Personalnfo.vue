<template>
    <div class="flex">
      <el-form :model="ruleForm" status-icon  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="组织">
              <span>{{ruleForm.group}}</span>
          </el-form-item>
          <el-form-item label="用户名"  prop="username"> 
              <el-input  v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" >
              <span>{{ruleForm.email}}</span>
          </el-form-item>
          <el-form-item label="账户类型">
              <span>{{ruleForm.type | userTypeFilter}}</span>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
    
        <UploadPhoto :imageUrl="ruleForm.img" @success="success($event)"></UploadPhoto>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
  export default {
  
    props:{
      userInfo:{
        type:Object,
        default:() => ({})
      }
    },
    data() {   
      return {
        ruleForm: {img:''},    
        rules:{
          username:[
            {required:true,message:'请输入用户名',trigger:'blur'}
          ]
        }, 
        file:File,
      
      }
     
    },
    created(){
      this.ruleForm = this.userInfo
    },
    methods: {
      ...mapMutations([
        'setLoginName',
      ]),
      //提交修改
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            console.log(this.file)
            //  this.$API.updateUserName(this.newForm).then((res) => {
            //    if(res.data.errorcode === 1){
            //     this.tableData = res.data.data.data_list
            //     this.total = res.data.data.num_results
            //    }
            // })

            this.setLoginName(this.ruleForm.username)
          } 
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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