<template>
    <div>
     <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                label="素材">
                <template slot-scope="scope" >
                    <div class="content-item" @click="showMaterialDtl(scope.row)">
                        <div><img :src="scope.row.img" class="content-item-img"/></div>
                        <div>
                            <p>{{scope.row.name}}</P>
                            <p class="content-item-desc">图片 {{scope.row.num}}张</P>
                        </div>
                    </div>   
                </template>
            </el-table-column>
                            
            <el-table-column
                prop="cteated_date"
                label="录入时间"
                width="150">
            </el-table-column>   
             <el-table-column
                label="组织" v-if="userType === '1'">  
                    <template  slot-scope="scope">                             
                        {{scope.row.group}}   
                    </template>             
            </el-table-column>       
            <el-table-column
             v-else
                label="操作"
                width="130" >  
                    <template  slot-scope="scope">                             
                        <el-button type="text" size="small" v-if="scope.row.statu === 'remove'" @click="showAddToTrain(scope.row)">加入训练</el-button>
                        <el-button type="text" size="small" v-else disabled>待训练</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" size="small" @click="deleteMaterial(scope.row.app_id)">删除 </el-button>   
                    </template>             
            </el-table-column>    
        </el-table>
         <el-dialog
            :visible.sync="pictureListVisiable"
            title="素材查看"
            width="50%" center >     
                <pickPicToTrain type="query" :material="material" ></pickPicToTrain>
        </el-dialog>


        <el-dialog
            :visible.sync="addToTrainVisiable"
            title="加入训练"
            width="50%" center >

            <pickPicToTrain  ref="pickPicToTrain"  type="pick" :material="material" ></pickPicToTrain>                
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addToTaskList">加入训练</el-button>
                <el-button @click="addToTrainVisiable = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>    
</template>

<script>

export default {
    props:{
        userType:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            tableData:[],
            pictureListVisiable:false,
            material:{},
            pictureList:[],
            addToTrainVisiable:false,
       
        }
    },
    created(){
        this.getMaterialList()
    },

 
  
   
    methods:{
        //获取素材列表
        getMaterialList(){
            this.tableData = [
                {id:'1',
                cteated_date: '2020-03-31 10:20:25',
                name: '大恐龙玩具模型素材',    
                num:'185'  ,  
                img:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
                group:'一号组织'
                }, 
                   {id:'2',
                cteated_date: '2020-03-31 10:20:25',
                name: '小恐龙玩具模型素材',    
                num:'89'  ,  
                img:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
                group:'一号组织'

                }, 
                   {id:'3',
                cteated_date: '2020-03-31 10:20:25',
                name: '测试模型素材',    
                num:'56'  ,  
                img:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
                group:'军统'

                }, 
                   {id:'4',
                cteated_date: '2020-03-31 10:20:25',
                name: '测试啊啊啊啊啊啊啊啊啊素材',    
                num:'109'  ,  
                img:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
                 group:'地下党'

                }, 

            ]

            //  this.$API.getAdminList(this.currentPage,this.pageSize,this.search).then((res) => {
            //    if(res.data.errorcode === 1){
            //     this.tableData = res.data.data.data_list
            //     this.total = res.data.data.num_results
            //    }
            // })
           
            this.tableData.forEach(item =>item['statu'] = 'remove')
           

        },

        //查看素材列表
        showMaterialDtl(material){
            this.material = material  
            this.material.pictureList = []
            for (let i = 1; i <=   this.material.num; i++) {
                this.material.pictureList.push({
                    id: i,
                    src: 'http://appstoretest.orbbec.me:10091/img/8d50bd603654cf55a3669ebfc5ef2603.png',
                });
            } 
            this.pictureListVisiable = true                   
        },

        //展示添加训练
        showAddToTrain(obj){
            this.addToTrainVisiable = true 
            this.material = obj
            this.checkAll = true
            this.model_name = ''
            this.material.pictureList = []
            for (let i = 1; i <=   this.material.num; i++) {
                this.material.pictureList.push({
                    id: i,
                    src: 'http://appstoretest.orbbec.me:10091/img/8d50bd603654cf55a3669ebfc5ef2603.png',
                });
            } 
            this.isIndeterminate = false
            this.material.pictureList.forEach(item => item['checked'] = true)
            console.log(this.material)
        },

        

        //加入训练
        addToTaskList(){   
            if(this.$refs.pickPicToTrain.model_name === ''){
                 this.$message({
                    showClose: true,
                    message: '模型名称不能为空',
                    type: 'error'
                 });
                return 
            }else if(this.$refs.pickPicToTrain.chekcedLength === 0){
                 this.$message({
                    showClose: true,
                    message: '素材选择不能为空',
                    type: 'error'
                });
                return 
            }
            //设置类型，返回给父组件
            this.material['type'] = '1'
            this.material['m_name'] = this.model_name
            this.$emit('addToTaskList',this.material)

            //更新视图
            let index = this.tableData.findIndex(item => item.id === this.material.id)
            this.material['statu'] = 'add'
            this.$set(this.tableData,index,this.material )  
            
            //隐藏弹框
            this.addToTrainVisiable = false 
        },

        //删除
        deleteMaterial(id){
            this.$confirm('此操作将永久删除该素材, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                //  this.$API.delete(id).then((res) => {
                //    if(res.data.errorcode === 1){
                //     this.tableData = res.data.data.data_list
                //     this.total = res.data.data.num_results
                //    }
                // })
            }); 
        },

        
    }
}
</script>

<style scoped>
  
</style>