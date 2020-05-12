<template>
    <div>
        <div class="form-item">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="组织" prop="group">
                    <el-input v-model="form.group"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-button size="mini" type="primary" @click="resetPwd">重置</el-button><span>注：重置后密码为邮箱名</span>
                </el-form-item> 
            </el-form>  
            <div>
                <el-button type="primary">提交</el-button>
                <el-button @click="back">取消</el-button>
            </div>
        </div> 
        <el-divider></el-divider>
        <el-row>
            <el-col :span="1" :offset="1">设备</el-col>
            <el-col :span="22">
                <div class="device-list">
                    <el-card v-for="(item,index) in form.devices" :key="index">
                        <div  class="device-item">
                            <span>{{item.name}}</span>
                             
                            <el-tooltip class="item" effect="dark" :content="item.sn" placement="top-start">
                                <div class="device-item-sn">SN</div>
                            </el-tooltip>
                        </div>
                    </el-card>
                </div>   
            </el-col>
        </el-row> 
        <el-divider></el-divider>
        <el-row>
            <el-col :span="1" :offset="1">模型</el-col>
            <el-col :span="22">
                 <div class="model-list">
                     <el-card v-for="(item,index) in form.models" :key="index">
                        <div  class="model-item">
                            <div >
                                <img  width="59" height="59" src="data:image/png;base64,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"/>
                            </div>
                            <div >
                                <p>{{item.name}}</p>
                                <p class="model-item-code">编号:{{item.code}}</p>
                            </div>                           
                        </div>
                     </el-card>
                 </div>
            </el-col>
        </el-row>     
    </div>    
</template>

<script>
export default {
    
    data(){
        return{
            groupId:'',
            form:{
                group:'',
                username:'',
                email:'',
                devices:[],
                models:[]
            },
            rules:{
                 group:[
                    {required:true,message:'组织不能为空',trigger:'blur'}
                 ],
                username:[
                    {required:true,message:'用户名不能为空',trigger:'blur'}
                ],
                email:[
                   {required:true,message:'邮箱不能为空',trigger:'blur'},
                   {type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    created(){
        this.init()
    },
    methods:{
        
        init(){
            this.groupId = this.$route.params.groupId
            this.getGroupById()
        },
        getGroupById(){

            //  this.$API.getGroupById(this.currentPage,this.pageSize,this.search).then((res) => {
            //    if(res.data.errorcode === 1){
            //     this.form = res.data.data.data_list
            //    }
            // })
             for(let i = 0 ;i< 15 ;i++ ){
                this.form.devices.push({name:`学而思智能投影${i}`,sn:'12312313123'})
                this.form.models.push({name:`大恐龙玩具模型${i}`,code:'12312313123',img:''})
            }
            this.form.group ="123213"
            this.form.username ="123213"
            this.form.email ="123@qq.com"

        },

        resetPwd(){
            this.$confirm('确定重置密码吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                  this.$API.updateGroupPwd(this.form.username).then((res) => {
                    if(res.data.errorcode === 1){
                      this.$message.success('删除成功')    
                      this.getAdminList()              
                    }else{
                      this.$message.error(res.message);
                    } 
                  })
            }) 
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
    .el-card{
        margin:0 20px 20px;
    }
    /deep/ .el-card__body{
        padding: 10px ;
    }
    .device-list,.model-list{
        display: flex;
        flex-wrap: wrap;
    }
    
 
    .model-item{
        width: 240px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .model-item p{
        text-align: left;
    }
    .model-item-code{
        color:#707070;
    }

</style>