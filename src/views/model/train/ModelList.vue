<template>
    <div>
     <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
            label="模型">
                <template slot-scope="scope">
                    <div class="content-item" @click="showModelDtl(scope.row)">
                        <div><img :src="scope.row.img" class="content-item-img"/></div>
                        <div>
                            <p>{{scope.row.name}}</P>
                            <p class="content-item-desc">选用图片 {{scope.row.num}}张</P>
                        </div>
                    </div>   
                </template>
            </el-table-column>
              <el-table-column v-if="userType === '1'"
                prop="model_num"
                label="模型编号"
                >
            </el-table-column>              
            <el-table-column 
                prop="finished_time"
                label="训练完成时间"
                width="180">
            </el-table-column>            
             <el-table-column          
                label="绑定内容" v-if="userType === '3' ||userType === '4' ">
                <template slot-scope="scope">
                    {{scope.row.hasContent === 'Y' ? '是':'否'}}
                </template>
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
                width="150">  
                    <template  slot-scope="scope">                
                        <el-button type="text" size="small" v-if="scope.row.statu === 'remove'" @click="showAddToTrain(scope.row)">加入优化</el-button>
                        <el-button type="text" size="small" v-else disabled>待优化</el-button>

                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" size="small" @click="deleteModel(scope.row.app_id)">删除</el-button>                      
                    </template>             
            </el-table-column>
        </el-table>
         <el-dialog
            :visible.sync="pictureListVisiable"
            title="模型查看"
            width="50%" center >
                <PickToOptimize type="query" :model="JSON.parse(JSON.stringify(model))"></PickToOptimize>
        </el-dialog>
         <el-dialog
            :visible.sync="addToTrainVisiable"
            title="加入优化"
            width="50%" center >
            <PickToOptimize  type="pick" :model="JSON.parse(JSON.stringify(model))" ></PickToOptimize>
             <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addToTaskList">加入优化</el-button>
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
            taskList:[],
            pictureListVisiable:false,
            model:{},
            pictureList:[],
            addToTrainVisiable:false
        }
    },
    created(){
        this.getModelList()
    },
    methods:{
        //获取素材列表
        getModelList(){
            this.tableData = [
                {id:'1',
                cteated_date: '2020-03-31 10:20:25',
                name: '大恐龙玩具模型',    
                num:'185'  ,  
                img:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
                hasContent:'Y',
                model_num:'00000001',
                group:'卡卡西行动小组',
                finished_time:'2020-04-01 10:20:25'
               
                }, 
                   {id:'2',
                cteated_date: '2020-03-31 10:20:25',
                name: '小恐龙玩具模型',    
                num:'89'  ,  
                img:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
                hasContent:'N',
                model_num:'12312355555',
                group:'卡卡西行动小组',
                finished_time:'2020-04-01 10:20:25'


                }, 
                   {id:'3',
                cteated_date: '2020-03-31 10:20:25',
                name: '测试模型',    
                num:'56'  ,  
                img:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
                hasContent:'N',
                model_num:'8888888888',
                group:'木叶村',
                finished_time:'2020-04-01 10:20:25'


                }, 
                   {id:'4',
                cteated_date: '2020-03-31 10:20:25',
                name: '测试啊啊啊啊啊啊啊啊啊模型',    
                num:'109'  ,  
                img:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
                hasContent:'Y',
                model_num:'99998585544',
                group:'木叶村',
                finished_time:'2020-04-01 10:20:25'

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

        showAddToTrain(obj){
            this.model = obj 
            this.model['pictureList'] = this.pictureList
            this.addToTrainVisiable = true
        },
        addToTaskList(){   
            //设置类型，返回给父组件
            this.model['type'] = '2'
            this.$emit('addToTaskList',this.model)
           
            //更新视图
            let index = this.tableData.findIndex(item => item.id === this.model.id)
            this.model['statu'] = 'add'
            this.$set(this.tableData,index,this.model )  

            //关闭
            this.addToTrainVisiable = false
           
        },
        deleteMaterial(id){
            this.$confirm('此操作将永久删除该模型, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                
            }); 
        },
        showModelDtl(model){
            this.pictureListVisiable = true
            this.model = model
            for (let i = 1; i <= 27; i++) {
                this.pictureList.push({
                    id: i,
                    src: 'http://appstoretest.orbbec.me:10091/img/8d50bd603654cf55a3669ebfc5ef2603.png',
                });
            }  
            
        }
    }
}
</script>

<style scoped>
    
</style>