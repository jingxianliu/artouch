<template>
    <div name="admin-list"> 
      <div v-if="!openRouter" >
        <div class="flex-between">
          <div>
            <el-input
            v-model="search"
            placeholder='请输入管理员名称查询'
            class="search-input"
            clearable
            size="medium"
            @keyup.enter.native="getAdminList(1)"
            >
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getAdminList(1)"></i>
            </el-input> 
             <el-button type="primary" @click="getAdminList()" size="medium">查询</el-button>
             <el-button  @click="search = ''" size="medium">重置</el-button>
          </div> 
            <el-button type="primary" @click="addAdmin()" size="medium">+ 新建</el-button>
        </div>
        <el-table 
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          @row-click="rowClick">
          <el-table-column
            prop="username"
            label="账号"
            >
          </el-table-column>
           <el-table-column
            label="账户类型"
            >
              <template slot-scope="scope">
            {{scope.row.type | userTypeFilter }}
          </template>
          </el-table-column>
          <el-table-column
            prop="email"
            label="注册邮箱"
            >
        
          </el-table-column>
         <el-table-column
            prop="create_time"
            label="创建时间"
            width="150">
          </el-table-column>          
          <el-table-column
            prop="create_time"
            label="活跃时间"
            width="150">  
          </el-table-column>          
          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button type="text"  @click="gotoAdminDtl(scope.row)">编辑</el-button>
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
          openRouter:false,
          
        }
      },
   
      watch: {
        $route: {
            handler: function(val, oldVal){ 
                if(val !== oldVal){
                    this.openRouter = !this.openRouter  
                    this.getAdminList()
                }
              
            },
            // 深度观察监听
            deep: true
        }  
      },
      computed:{
        ...mapState({ 
            userType:state=>state.userType ,
          }),        
      },
      created(){
        this.openRouter = false            
        this.getAdminList(this.currentPage)               
      },
      methods:{
        //获取产品列表
         getAdminList(currentPage){
           if(currentPage){
              this.currentPage = currentPage
            }
             this.tableData =[
              {id:'1',username:'root',email:'123@qq.com',type:'1',group:'奥比智影',create_time:'2020-04-01 15:52:25',active_time:'2020-04-07 15:52:25',img:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {id:'2',username:'admin',email:'123@qq.com',type:'2',group:'奥比智影',create_time:'2020-04-01 15:52:25',active_time:'2020-04-07 15:52:25',img:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {id:'3',username:'100224',email:'123@qq.com',type:'3',group:'学布思教育有限公司',create_time:'2020-04-01 15:52:25',active_time:'2020-04-07 15:52:25',img:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {id:'4',username:'123123',email:'123@qq.com',type:'4',group:'学布思教育有限公司',create_time:'2020-04-01 15:52:25',active_time:'2020-04-07 15:52:25',img:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},

            ]
            this.total = 4

            //  this.$API.getAdminList(this.currentPage,this.pageSize,this.search).then((res) => {
            //    if(res.data.errorcode === 1){
            //     this.tableData = res.data.data.data_list
            //     this.total = res.data.data.num_results
            //    }
            // })
           
         },

          //改变每页数量
         handleSizeChange(val){
            this.pageSize = val 
            this.getAdminList(1)
         },
          //改变当前页数
          handleCurrentChange(val) {
            this.currentPage = val 
            this.getAdminList()
          },

          //添加
          addAdmin(){ 
            if(this.userType === '1'){
                this.$router.push({name :'admin-add',params:{type:'admin'}})
            } else{
                this.$router.push({name :'account-add',params:{type:'admin'}})
            }  

          },
        
          //跳转到管理员详情页面
          gotoAdminDtl(userInfo){
              if(this.userType === '1'){
                this.$router.push({name :'admin-details',params:{userInfo:userInfo}}) 
            } else{
                this.$router.push({name :'account-details',params:{userInfo:userInfo}}) 
            }  
                          
          },

          //删除管理员
          handleCommand(id){               
            this.$confirm('此操作将永久删除该纪录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                  this.$API.deleteAdmin(id).then((res) => {
                    if(res.data.errorcode === 1){
                      this.$message.success('删除成功')    
                      this.getAdminList()              
                    }else{
                      this.$message.error(res.message);
                    } 
                  })
            });                       
          },
          rowClick(row,column){
             if(column.label !== '操作'){
                this.gotoAdminDtl(row)
             }
          }

        
      }
    }
  </script>

  <style scoped>
  </style>