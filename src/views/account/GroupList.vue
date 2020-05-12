<template>
    <div name="product-list"> 
      <div v-if="!openRouter">
        <div class="flex-between">
            <div>
                <el-input
                v-model="search"
                placeholder='请输入组织名称查询'
                class="search-input"
                clearable
                size="medium"
                @keyup.enter.native="getGroupList(1)"
                >
                <i slot="suffix" class="el-input__icon el-icon-search" @click="getGroupList(1)"></i>
                </el-input> 
                <el-button type="primary" @click="getGroupList()" size="medium">查询</el-button>
                <el-button  @click="search = ''" size="medium">重置</el-button>
            </div>
            <el-button type="primary" @click="addGroup()" size="medium">+ 新建</el-button>
        </div>
        <el-table 
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          @row-click="rowClick">
          <el-table-column
            prop="group"
            label="组织"
            >
          </el-table-column>
           <el-table-column
            prop="email"
            label="注册邮箱"
            >
          </el-table-column>
          <el-table-column
            label="设备数量"
             prop="num"
             width="100"
            >
            <!-- <template slot-scope="scope">
              <span
                class="name-span"           
              >{{ scope.row.node_type_id |  nodeTypeFilter }}</span>
            </template> -->
          </el-table-column>
         <el-table-column
            prop="create_time"
            label="创建时间"
            width="150">
          </el-table-column>          
          <el-table-column
            prop="active_time"
            label="活跃时间"
            width="150">  
          </el-table-column>          
          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button type="text"  @click="gotoGroupDtl(scope.row.id)">编辑</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="scope.row.id">删除</el-dropdown-item>      
                </el-dropdown-menu>
              </el-dropdown>        
            </template>
          </el-table-column>
        </el-table>
        <Pagination :currentPage="currentPage" :pageSize="pageSize" :total ="total" 
          @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
        ></Pagination>
      </div>
      <router-view/> 
      
    </div>
</template>

  <script>
    import {mapState, mapMutations, mapGetters} from 'vuex'

    export default {
      data() {
        return {
          tableData:[],
          currentPage:1,
          pageSize:10,
          total:0,
          productId:0,
          search:'',
          searchLabel:[],
          openRouter:false,
          addLabelVisible:false,
          
        }
      },
   
      watch: {
        $route: {
            handler: function(val, oldVal){ 
                if(val !== oldVal){
                    this.openRouter = !this.openRouter  
                    this.getGroupList()
                }     
            },
            // 深度观察监听
            deep: true
        }  
      },
      created(){
        this.openRouter = false           
        this.getGroupList(this.currentPage)                
      },
      methods:{
        //获取产品列表
         getGroupList(currentPage){
           if(currentPage){
              this.currentPage = currentPage
            }

            this.tableData =[
              {id:'1',group:'组织一',email:'123@qq.com',num:15,create_time:'2020-04-01 15:52:25',active_time:'2020-04-07 15:52:25'},
              {id:'2',group:'组织二',email:'123@qq.com',num:15,create_time:'2020-04-01 15:52:25',active_time:'2020-04-07 15:52:25'},
              {id:'3',group:'组织三',email:'123@qq.com',num:15,create_time:'2020-04-01 15:52:25',active_time:'2020-04-07 15:52:25'},
              {id:'4',group:'组织四',email:'123@qq.com',num:15,create_time:'2020-04-01 15:52:25',active_time:'2020-04-07 15:52:25'},

            ]
            this.total = 4
             console.log(this.currentPage,this.pageSize,this.search)
            //  this.$API.getGropuList(this.currentPage,this.pageSize,this.search).then((res) => {
            //    if(res.data.errorcode === 1){
            //     this.tableData = res.data.data.data_list
            //     this.total = res.data.data.num_results
            //    }
            // })          
         },

          //改变每页数量
         handleSizeChange(val){
            this.pageSize = val 
            this.getGroupList(1)
         },
          //改变当前页数
          handleCurrentChange(val) {
            this.currentPage = val 
            this.getGroupList()
          },

          //点击新增按钮  
          addGroup(){    
              this.$router.push({name :'group-add',params:{type:'group'}})
          },
        
          //跳转到组织详情页面
          gotoGroupDtl(groupId){
              this.$router.push({name :'group-details',params: {"groupId":groupId}})             
          },

          //删除产品
          handleCommand(id){               
            this.$confirm('此操作将永久删除该纪录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                  this.$API.deleteGroup(id).then((res) => {
                    if(res.data.errorcode === 1){
                      this.$message.success('删除成功')    
                      this.getGroupList()              
                    }else{
                      this.$message.error(res.message);
                    } 
                  })
            });                       
          },
          rowClick(row,column){
            if(column.label !== '操作'){
               this.gotoGroupDtl(row.id)
            }
          }

       

     
      }
    }
  </script>

  <style scoped>
  
  
  </style>