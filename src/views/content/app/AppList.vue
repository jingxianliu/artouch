<template>
    <div name="device-list">  
       <div v-if="!openRouter"> 
            <div class="margin-top-20 flex-between">
              <div>
                <el-input
                v-model="search"
                placeholder='请输入App名称进行查询'
                class="search-input"
                clearable
                size="medium"
                @keyup.enter.native="getAppList(1)"
                >
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="getAppList(1)"></i>
                </el-input> 
                <el-button type="primary" @click="getAppList()" size="medium">查询</el-button>
                <el-button  @click="search = ''" size="medium">重置</el-button>
              </div>
              <div>
                <el-button type="primary" @click="addApp()" size="medium">+ 新建</el-button>
              </div>
          </div> 
                
          <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort = "{prop: 'cteated_date', order: 'descending'}"
              @row-click="rowClick"
              >
              <el-table-column
              label="APP"
              >
                <template slot-scope="scope">
                  <div class="content-item">
                      <div>
                        <p>{{scope.row.content}}</P>
                        <p class="content-item-desc">{{scope.row.desc}}</P>
                      </div>
                  </div>   
                </template>
              </el-table-column>
              <el-table-column
              label="APP图标"       
              >
                <template slot-scope="scope">
                    <el-image :src="scope.row.img" :preview-src-list="[...scope.row.img]" class="content-item-img"></el-image>                                                         
                </template>
              </el-table-column>               
              <el-table-column
              prop="cteated_date"
              label="创建时间"
              
              sortable
              >
              </el-table-column>
              <el-table-column
              prop="update_date"
              label="编辑时间"
              
              sortable
              >
              </el-table-column>
              <el-table-column
              label="操作"
              width="180">  
                  <template  slot-scope="scope">
                      <div >
                          <el-button type="text" size="middle" @click="gotoAppDtl(scope.row.id,'edit')">配置</el-button>
                          <el-divider direction="vertical"></el-divider>
                          <el-button type="text" size="middle" @click="gotoAppDtl(scope.row.id,'query')">查看</el-button>
                          <el-divider direction="vertical"></el-divider>
                          <el-dropdown @command="handleCommand">
                              <span class="el-dropdown-link">
                                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
                              <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item :command="{type:'delete',id:scope.row.id}">删除</el-dropdown-item>
                              </el-dropdown-menu>
                          </el-dropdown>
                      </div>                      
                  </template>               
              </el-table-column>
          </el-table>
          <Pagination :currentPage="currentPage" :pageSize="pageSize" :total ="total" 
          @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
        ></Pagination>
      </div>
       <router-view v-else />  
    </div>  
   
</template>

<script>
  export default {
    data() {
      return {
        search:'',
        openRouter:false,
        tableData: [],
        currentPage:1,
        pageSize:10,
        total:0,
     
      }
    },
    watch: {
        $route:function(){
            this.openRouter = !this.openRouter                 
        }
    },
    created(){
        this.getAppList()
    },
    methods: {

      getAppList(){
            //  this.$API.getDeviceList(this.currentPage,this.pageSize,this.search).then((res) => {
            //    if(res.data.errorcode === 1){
            //     this.tableData = res.data.data.data_list
            //     this.total = res.data.data.num_results
            //    }
            // })
          this.tableData =  [{
            id:'1',
            cteated_date: '2020-03-31 10:20:25',
            update_date: '2020-03-31 16:20:25',
            content: '小恐龙绘本教育',    
            desc:'对恐龙进行科普的互动娱乐型绘本'  ,  
            model: '霸王龙',
            img:'http://appstoretest.orbbec.me:10091/img/0e1d0876aa23770eb899d793af22c702.png',
        
          }, {
            id:'2',
            cteated_date: '2020-03-30 10:20:25',
            update_date: '2020-03-31 14:20:25',
            model: '霸王龙',
            content:'欧宝体感看书书',
            desc:'对恐龙进行科普的互动娱乐型绘本'  ,  
            img:'http://appstoretest.orbbec.me:10091/img/0e1d0876aa23770eb899d793af22c702.png',

          }, {
              id:'3',
            cteated_date: '2020-03-29 10:20:25',
            update_date: '2020-03-31 11:20:25',
            model: '霸王龙',    
            content:'大龙教你做菜',
            desc:'对恐龙进行科普的互动娱乐型绘本'  ,  
            img:'http://appstoretest.orbbec.me:10091/img/0e1d0876aa23770eb899d793af22c702.png',

          }, {
            id:'4',
            cteated_date: '2020-03-28 10:20:25',
            update_date: '2020-03-29 10:20:25',
            model: '霸王龙',
            content:'小恐龙绘本教育',
            desc:'对恐龙进行科普的互动娱乐型绘本'  ,  
            img:'http://appstoretest.orbbec.me:10091/img/0e1d0876aa23770eb899d793af22c702.png',

          }]

      },
  
      //改变每页数量
      handleSizeChange(val){
          this.pageSize = val 
          this.getAppList(1)
        },
        //改变当前页数
      handleCurrentChange(val) {
          this.currentPage = val 
          this.getAppList()
      },

      //添加
      addApp(){
        this.$router.push({ name: 'add-app',params:{type:'add'} })
      },
     
      //编辑/查看App
      gotoAppDtl(id,type){
        this.$router.push({ name: 'edit-app' ,params:{type:type,appId:id}})
      },

      //更多操作--删除
      handleCommand(id){               
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.deleteDevice(id)
        });         
      },

      //删除
      deleteApp(id){
        this.$API.deleteProduct(id).then((res) => {
            if(res.data.errorcode === 1){
                this.$message.success('删除成功')    
                this.getAppList()              
            }else{
                this.$message.error(res.message);
            } 
        })
      },
     
      rowClick(row,column){
        if(column.label !== '操作'){
          this.gotoAppDtl(row.id,'query')
        }
      }
     

    }
  }
</script>

<style scoped>
 
  .content-item{
    display: flex;
    align-items: center;
  }
  .content-item-img{
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
  .content-item-desc{
    color:#858585
  }
</style>
