<template>
    <div name="edit-device">
        <div class="flex-between">
            <p>基本信息</p> 
            <div v-if="type !== 'query'">
                <div v-show="!editFlg">
                    <el-button type="primary" @click="changeEditFlg">编辑</el-button>
                </div>
                <div v-show="editFlg">
                    <el-button type="primary" @click="editSubmit">提交</el-button>
                    <!-- <el-button v-if="!this.deviceId" @click="$router.back()">返回</el-button>
                    <el-button v-else @click="editFlg = false">取消</el-button> -->
                    <el-button v-if="this.deviceId" @click="cancelEdit">取消</el-button>
                </div>
            </div>
        </div>
        <el-form  :model="deviceInfo" ref="deviceForm" label-width="80px" :rules="editFlg ? rules :{}">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="设备名称" prop="name">
                        <span v-show="!editFlg">{{deviceInfo.name}}</span>
                        <el-input v-show="editFlg" v-model="deviceInfo.name"></el-input>
                    </el-form-item>  
                </el-col>    
                <el-col :span="8">
                    <el-form-item label="S N 编码" prop="sn">
                       <span v-show="!editFlg">{{deviceInfo.sn}}</span>
                      <el-input v-show="editFlg" v-model="deviceInfo.sn"></el-input>
                    </el-form-item>  
                </el-col>
                 <el-col :span="8" v-if="type === 'edit'">
                    <el-form-item label="设备状态">
                        <span>{{deviceInfo.statu === 0 ? '离线':'活跃'}}</span>
                    </el-form-item>  
                </el-col>        
            </el-row>
              <el-row :gutter="20">
                <el-col :span="8" v-if="userType === '1' || userType === '2'">
                    <el-form-item label="组织" >
                        <span >{{deviceInfo.group}}</span>
                    </el-form-item>  
                </el-col> 
            
                <el-col :span="8" v-else>      
                    <el-form-item label="描述" prop="desc">
                       <span v-show="!editFlg">{{deviceInfo.desc}}</span>
                      <el-input v-show="editFlg" v-model="deviceInfo.desc"></el-input>
                    </el-form-item>  
                </el-col>
                 <el-col :span="8" v-if="type !== 'add'">
                    <el-form-item label="录入时间">
                        <span>{{deviceInfo.created_time}}</span>
                    </el-form-item>  
                </el-col>        
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8" >
                    <el-form-item label="App" >
                        <span v-show="!editFlg">{{deviceInfo.group}}</span>
                        <el-select v-show="editFlg" v-model="deviceInfo.app_id" placeholder="请选择">
                            <el-option
                            v-for="item in appList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button type="text" @click="dialogVisible = true" v-if="deviceInfo.app_id">[预览]</el-button>
                    </el-form-item>  
                </el-col> 
 
                 <el-col :span="8" v-if="type !== 'add'">
                    <el-form-item label="编辑时间">
                        <span>{{deviceInfo.update_time}}</span>
                    </el-form-item>  
                </el-col>        
            </el-row>
           
        </el-form> 
        <el-divider></el-divider>
            <p>内容绑定</p> 
            <el-transfer        
                :titles="['已有内容模型', '该设备绑定内容']"
                v-model="deviceInfo.content"
                :data="contentList">
            </el-transfer>
         <el-dialog
            :visible.sync="dialogVisible"
            width="50%">
            <appDetails :appId="deviceInfo.app_id"></appDetails>   
        </el-dialog>
    </div>
</template>


<script>
import appDetails from './AppDetails'
import {mapState} from 'vuex'

export default {
    components:{appDetails},
  
    data() {      
    
      return {
        deviceInfo:{},
        deviceInfo_temp:{},
        contentList:[],
        editFlg:true,
        appList:[],
        deviceId:'',
        type:'',
        dialogVisible:false,
        rules:{
            name:[{required:true,message:'请输入设备名称',trigger:'blur'}],
            sn:[{required:true,message:'请输入设备sn码',trigger:'blur'}]
        },     
      }
    },
    watch: {
        editFlg: function () {
            this.contentList.forEach(item => item.disabled = !this.editFlg )             
        },
         deviceId: {
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
     computed:{
      ...mapState({ 
          userType:state=>state.userType ,
        }),        
    },

    methods:{
        async init(){
           this.deviceId = this.$route.params.deviceId
           this.type = this.$route.params.type
           if(this.type === 'query'){
               this.editFlg = false
           }
           console.log(this.type,this.deviceId)
            if(this.deviceId){
                this.deviceInfo = await this.getDeviceInfo()
                this.deviceInfo_temp = JSON.parse(JSON.stringify(this.deviceInfo ))
            }else{
               this.deviceInfo =  {name:'',
                sn:'',
                // statu:'',
                desc:'',
                // created_time:'',
                // update_time:'',
                // app:'',
                app_id:'',
                content:[]
                }
                this.changeEditFlg()
            }
            this.getContentList()
        },

        //获取设备详情信息
        getDeviceInfo(){
            return {
            id:this.deviceId,
            name:'学而思智能投影',
            sn:'ZJ1912CNA1002FF1A',
            statu:'活跃',
            desc:'描述设备的地址等相关信息，16字。',
            created_time:'2020-03-31  09:11:32',
            update_time:'2020-03-31  10:00:02',
            app:'小恐龙绘本教育',
            group:'学而不思公司',
            app_id:'001',
            //content:[1,4,6]
            content:[]
            }
        },

        //获取内容列表
        getContentList(){
            //  this.$API.getContentList(this.currentPage,this.pageSize,this.search).then((res) => {
            //    if(res.data.errorcode === 1){
            //     this.tableData = res.data.data.data_list
            //     this.total = res.data.data.num_results
            //    }
            // })
            
            this.contentList = []
            for (let i = 1; i <= 15; i++) {
                this.contentList.push({
                    key: i,
                    label: `选项 ${ i }`,
                    disabled:!this.editFlg
                });
            }            
        },

        //点击编辑按钮
        changeEditFlg(){
            this.editFlg = true
            this.getAppList()
        },

        //提交
        editSubmit(){
            console.log(this.deviceInfo)
            this.$refs.deviceForm.validate((valid) => {
                if (valid) {
                    if(this.type === 'edit'){//编辑

                    }else if(this.type === 'add'){ //新增

                    }         
                }
            })
           
        },

        //取消编辑
        cancelEdit(){
            this.editFlg = false
            this.deviceInfo = JSON.parse(JSON.stringify(this.deviceInfo_temp))

        },
       
        //获取app列表
        getAppList(){

            //  this.$API.getAppList(this.currentPage,this.pageSize,this.search).then((res) => {
            //    if(res.data.errorcode === 1){
            //     this.tableData = res.data.data.data_list
            //     this.total = res.data.data.num_results
            //    }
            // })
            this.appList =  [{
            id: '001',
            name: '小恐龙绘本教育'
            }, {
            id: '002',
            name: '大龙教你做菜'
            }, {
            id: '003',
            name: '欧宝体感看书书'         
            }]
        }
        
        
    }
}
</script>


<style scoped>
    /* .el-col{
        display: flex;

    } */
    .el-form-item{
        width: 90%;
    }
    .el-select{
        width:80%;
    }
  

</style>