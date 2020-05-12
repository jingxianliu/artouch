<template>
    <div>
        <el-table
            :data="taskList"
            style="width: 100%">
            <el-table-column
            label="素材">
                <template slot-scope="scope">
                    <div class="content-item" @click="showPicList(scope.row)" >
                        <div><img :src="scope.row.img" class="content-item-img"/></div>
                        <div>
                            <p>{{scope.row.name}}</P>
                            <p class="content-item-desc">图片{{scope.row.num}}张，已选{{scope.row.num}}张</P>
                        </div>
                    </div>   
                </template>
            </el-table-column>
            <el-table-column
                label="模型名称"
                prop="m_name"
            >            
            </el-table-column>               
            <el-table-column
                label="训练类型"
                width="100">
                 <template  slot-scope="scope">       
                    <span>{{scope.row.type === '1' ? '新增模型':'优化模型'}}</span>         
                 </template>
            </el-table-column>  
              
             <el-table-column
                label="状态"
                width="80">
                <template  slot-scope="scope">       
                    <span>{{scope.row.statu === 'add' ? '待训练':'未知'}}</span>         
                </template>
            </el-table-column> 
            <el-table-column
                v-if="userType === '1' || userType === '2'"
                label="来源"
                width="100">
                 <template  slot-scope="scope">       
                    <span>{{scope.row.group}}</span>         
                 </template>
            </el-table-column>         
            <el-table-column
                v-else
                label="操作"
                width="80">  
                    <template  slot-scope="scope">                
                        <el-button type="text" size="small"  @click="remove(scope.row)">取消训练</el-button>
                    </template>             
            </el-table-column>
            
        </el-table>
        <div class="submit-btn">
            <el-button v-if="userType === '1' || userType === '2'" type="primary" @click="submit('start')" size="medium"> 开始训练</el-button>
            <el-button v-else type="primary" @click="submit('add')" size="medium"> 提交任务</el-button>
        </div>   

        <el-dialog
            :visible.sync="pictureListVisiable"
            :title="obj.type === '1' ? '素材查看':'模型查看'"
            width="50%" center >     
                <pickPicToTrain v-if="obj.type === '1'" type="query" :material="JSON.parse(JSON.stringify(obj))" ></pickPicToTrain>
                <PickToOptimize v-if="obj.type === '2'" type="query" :model="JSON.parse(JSON.stringify(obj))"></PickToOptimize>
        </el-dialog>          
    </div>
</template>

<script>
export default {
    
    props:{
        taskList:{
            type:Array,
            default:() => []
        },
         userType:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            pictureListVisiable:false,
            obj:{}
        }
    },
    
    created(){
    },
    methods:{
        remove(obj){
            this.$emit('remove',obj)
        },
        submit(type){
            let msg = '';
            if(type === 'add'){
                 msg = '是否提交训练任务，提交后将不可更改，等待训练完成才可添加新的训练任务?'
            }else{
                 msg = '是否让这一批训练任务开始训练?开始训练后，客户提交的训练任务将在下一批次参与训练。'

            }
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(type === 'add'){
                    this.submitTrain()
                }else{
                    this.submitTrain()
                }
                console.log(this.taskList)
            });
            // 。
        },
        //提交训练
        submitTrain(){
             console.log('add Train')
        },
        //开始训练
        startTrain(){
            console.log('start Train')

        },

        showPicList(obj){
            this.obj = obj
            this.pictureListVisiable = true
        }
    }
}
</script>

<style scoped>
    .submit-btn{
        margin-top: 20px;
        text-align: center;
    }
</style>