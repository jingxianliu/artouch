<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="素材列表" name="material">
                            <materialList ref="materialList" @addToTaskList="addToTaskList($event)" :userType="userType"></materialList>
                        </el-tab-pane>
                        <el-tab-pane label="模型列表" name="model">
                            <modelList ref="modelList" @addToTaskList="addToTaskList($event)" :userType="userType"></modelList>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
           </el-col>
            <el-col :span="12">
                <el-card>
                    <div class="header">                 
                        <div class="tab">待训练列表<div class="bottom"></div></div>
                        <div >
                            <el-badge v-if="userType === '1' || userType === '2' && num !== 0 " :value="`${num}+`"  class="item" @click="messageTips">
                                <span>待进入任务</span>
                            </el-badge>
                            <el-button v-else class="el-icon-delete" type="text" @click="clearTaskList" >清空任务列表</el-button>
                        </div>
                    </div>                      
                    <taskList :taskList="taskList" @remove="removeFromTaskList($event)" :userType="userType"></taskList>                      
                </el-card>  
            </el-col> 
        </el-row>
    </div>   
</template>


<script>
import materialList from './MaterialList'
import modelList from './ModelList'
import taskList from './TaskList'
import {mapState,mapGetters, mapMutations} from 'vuex'

  export default {
    components:{materialList,modelList,taskList},
    data() {
      return {
        activeName: 'material',
        activeName2:'task',
        taskList:[],
        num:0
      };
    },
    computed:{
      ...mapState({ 
          userType:state=>state.userType ,
        }),        
    },

    created(){
        this.getTaskNum()
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //添加到待训练列表
      addToTaskList(obj){
          this.taskList.push(obj)
      },

       //从待训练列表移除
      removeFromTaskList(obj){
        this.taskList = this.taskList.filter(item => item.id !== obj.id )
        obj['statu'] = 'remove'
        if(obj.type === '1'){
            let index  = this.$refs.materialList.tableData.findIndex(item => item.id === obj.id)
            this.$set(this.$refs.materialList.tableData,index,obj)
        }else{
            let index  = this.$refs.modelList.tableData.findIndex(item => item.id === obj.id)
            this.$set(this.$refs.modelList.tableData,index,obj)
        }
        
      },
      //清空待训练列表
      clearTaskList(){
          let that = this
          this.taskList.map((item) =>{
              that.removeFromTaskList(item)
          })
      },


      getTaskNum(){
          this.num = 99
      },

      messageTips(){
        this.$message(`当前新增${num}个训练任务，等待当前训练完成后加载`);
      }
    }
  };
</script>

<style scoped>
 .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    border-bottom: 2px solid #EBEEF5;
    color: #409EFF;
 }

 .tab{
     height: 40px;
     line-height: 40px;
 }

 .bottom{
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #409EFF;
    z-index: 1;
 }

 .item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
