<template>
    <div name="content-list">  
        <div v-if="!openRouter">  
          <div class="margin-top-20 flex-between">
              <div>
                <el-input
                v-model="search"
                placeholder='请输入内容名称或模型名称'
                class="search-input"
                clearable
                size="medium"
                @keyup.enter.native="getContentList(1)"
                >
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="getContentList(1)"></i>
                </el-input> 
                <el-button type="primary" @click="getContentList()" size="medium">查询</el-button>
                <el-button  @click="search = ''" size="medium">重置</el-button>
              </div>
              <div>
                <el-button type="primary" @click="addContent()" size="medium">+ 新建</el-button>
              </div>
          </div> 
            
          <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort = "{prop: 'cteated_date', order: 'descending'}"
              @row-click="rowClick"
              >
              <el-table-column
              label="内容"
              >
                <template slot-scope="scope">
                  <div class="content-item">                  
                      <el-image :src="scope.row.content_img" :preview-src-list="[...scope.row.content_img]" class="content-item-img"></el-image>                                                         
                      <div>
                        <p>{{scope.row.content}}</P>
                        <p class="content-item-desc">{{scope.row.desc}}</P>
                      </div>
                  </div>   
                </template>
              </el-table-column>
              <el-table-column
              label="模型"
              >
              <template slot-scope="scope">
                  <div class="content-item">
                      <el-image :src="scope.row.model_img" :preview-src-list="[...scope.row.model_img]" class="content-item-img"></el-image>                                       
                      <div>
                        <p>{{scope.row.content}}</P>
                      </div>
                  </div>   
                </template>
              </el-table-column>               
              <el-table-column
              prop="cteated_date"
              label="创建时间"
              width="180"
              sortable

              >
              </el-table-column>
              <el-table-column
              prop="update_date"
              label="编辑时间"
              width="180"
              sortable
              >
              </el-table-column>
              <el-table-column
              label="操作"
              width="200">  
                  <template  slot-scope="scope">
                    <el-button type="text" size="middle" @click="gotoContentDtl('edit',scope.row.id)">配置</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" size="middle" @click="gotoContentDtl('query',scope.row.id)">查看</el-button>
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
        <router-view v-else />  

    </div>    
</template>

<script>
  export default {
    data() {
      return {
        search:'',
        tableData: [],    
        currentPage:1,
        pageSize:10,
        total:0,
        openRouter:false  
      }
    },
     watch: {
        $route:function(){
            this.openRouter = !this.openRouter                 
        }
    },
    created(){
      this.getContentList()
    },
    methods: {
      

      getContentList(){
          //  this.$API.getContentList(this.currentPage,this.pageSize,this.search).then((res) => {
          //    if(res.data.errorcode === 1){
          //     this.tableData = res.data.data.data_list
          //     this.total = res.data.data.num_results
          //    }
          // })
          this.tableData = [{
            id:'1',
            cteated_date: '2020-03-31 10:20:25',
            update_date: '2020-03-31 12:20:25',
            content: '小恐龙绘本教育',    
            desc:'对恐龙进行科普的互动娱乐型绘本'  ,  
            model: '霸王龙',
            content_img:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
            model_img:'http://appstoretest.orbbec.me:10091/img/6507aee0bd0e1222e1232db8be8164f1.png'
        
          }, {
            id:'2',
            cteated_date: '2020-03-31 12:20:25',
            update_date: '2020-03-31 14:20:25',
            model: '霸王龙',
            content:'欧宝体感看书书',
            desc:'对恐龙进行科普的互动娱乐型绘本'  ,  
            content_img:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
            model_img:'http://appstoretest.orbbec.me:10091/img/6507aee0bd0e1222e1232db8be8164f1.png'

          }, {
              id:'3',
            cteated_date: '2020-03-31 15:20:25',
            update_date: '2020-03-31 16:20:25',
            model: '霸王龙',    
            content:'大龙教你做菜',
            desc:'对恐龙进行科普的互动娱乐型绘本'  ,  
            content_img:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
            model_img:'http://appstoretest.orbbec.me:10091/img/6507aee0bd0e1222e1232db8be8164f1.png'

          }, {
              id:'4',
            cteated_date: '2020-03-31 16:20:25',
            update_date: '2020-03-31 17:20:25',
            model: '霸王龙',
            content:'小恐龙绘本教育',
            desc:'对恐龙进行科普的互动娱乐型绘本'  ,  
            content_img:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
            model_img:'http://appstoretest.orbbec.me:10091/img/6507aee0bd0e1222e1232db8be8164f1.png'

          }]
      },

           //改变每页数量
        handleSizeChange(val){
            this.pageSize = val 
            this.getContentList(1)
         },
          //改变当前页数
        handleCurrentChange(val) {
            this.currentPage = val 
            this.getContentList()
        },

      //添加内容
      addContent(){
        this.$router.push({ name: 'add-content' ,params:{type:'add'}})
      },
    
      //编辑/查看内容
      gotoContentDtl(type,id){
        this.$router.push({ name: 'edit-content' ,params:{type:type,contentId:id}})
      },
    
      //更多操作--删除
      handleCommand(id){           
          this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.deleteContent(id)
          }); 
          
      },

      //删除
      deleteContent(id){
        this.$API.deleteProduct(id).then((res) => {
            if(res.data.errorcode === 1){
                this.$message.success('删除成功')    
                this.getContentList()              
            }else{
                this.$message.error(res.message);
            } 
        })
      },
      rowClick(row,column){
        if(column.label !== '操作'){
          this.gotoContentDtl('query',row.id)
        }
      }
     

    }
  }
</script>

<style scoped>
  
 
 
</style>
