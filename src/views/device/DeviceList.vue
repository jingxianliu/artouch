<template>
    <div name="device-list">  
        <div class="flex-between margin-top-20">  
            <div >
                <div class="margin-top-10">
                    <el-input
                    v-model="search"
                    placeholder='请输入SN码或者设备名称'
                    class="search-input"
                    clearable
                    size="medium"
                    @keyup.enter.native="getDeviceList(1)"
                    >
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="getDeviceList(1)"></i>
                    </el-input> 
                    <el-button type="primary" @click="getDeviceList()" size="medium">查询</el-button>
                    <el-button  @click="search = ''" size="medium">重置</el-button>
                </div> 
                <div class="margin-top-20" v-if="userType === '3' || userType === '4'">
                    <el-button type="primary" @click="addDevice()" size="medium">+ 新建</el-button>
                    <el-select v-model="orderValue" placeholder="请选择排序方式" @change="setOrderValue">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>  
            </div>
            <div v-if="copyFlg">   
                <img src="http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png"  class="icon-img">
                <div>已选App：{{targetAppName}}</div>
            </div>
        </div> 
        <el-table
            :data="tableData"
            style="width: 100%"
            @row-click="rowClick"
            >
            <el-table-column
                prop="sn"
                label="设备SN码"
                sortable
                >
            </el-table-column>
            <el-table-column
                prop="name"
                label="设备名称">
            </el-table-column>
            <el-table-column
                prop="desc"
                label="描述"
                v-if="userType === '3' || userType === '4'"
                >
           
            </el-table-column>
            <el-table-column
                v-else
                prop="group"
                label="组织"      
                >
             </el-table-column>
            <el-table-column
                prop="statu"
                label="状态"
                width="60"
                
                >
            </el-table-column>
            <el-table-column       
               sortable>

                <template slot="header" slot-scope="scope">
                     <el-dropdown @command="setOrderValue">
                        <span class="el-dropdown-link">
                                {{orderValue === '1'? '活跃时间': orderValue === '2' ? '编辑时间':'录入时间' }}
                                {{scope.row}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">活跃时间</el-dropdown-item>
                            <el-dropdown-item command="2">编辑时间</el-dropdown-item>
                            <el-dropdown-item command="3">录入时间</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    
               </template>
               <template slot-scope="scope">
                   <span> {{orderValue === '1' ? scope.row.active_time: orderValue === '2' ? scope.row.update_time:scope.row.created_time }}</span>
                </template>
                        
            </el-table-column>             
            <el-table-column
                label="APP"
                >
                <template slot-scope="scope">
                    {{scope.row.app}}<el-button type="text" @click="preViewApp(scope.row.app_id)">[预览]</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="230">  
                <template  slot-scope="scope" >
                    <div v-if="userType === '3' || userType === '4'">
                        <div v-if="!copyFlg">
                            <el-button type="text" size="middle" @click="gotoDeviceDtl(scope.row.id,'edit')">配置</el-button>
                            <el-divider direction="vertical"></el-divider>
                            <el-button type="text" size="middle" @click="copyApp(scope.row)">复制该App</el-button>
                            <el-divider direction="vertical"></el-divider>
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="{type:'query',id:scope.row.id}">查看</el-dropdown-item>
                                    <el-dropdown-item :command="{type:'delete',id:scope.row.id}">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div v-else>
                            <el-button  size="small" @click="copyDeviceApp(scope.row)" :disabled="scope.row.id === targetAppId">替换APP</el-button>
                            <el-divider direction="vertical"></el-divider>
                            <el-button type="text" size="middle" @click="copyFlg = false" >取消</el-button> 
                        </div>    
                    </div>
                    <div v-else>
                        <el-button type="text" size="middle" @click="gotoDeviceDtl(scope.row.id,'query')">查看</el-button>
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
        <el-dialog
            :visible.sync="appVisible"
            width="50%">
            <appDetails :appId="preViewAppId"></appDetails>   
        </el-dialog>
        <el-dialog
            :visible.sync="copyAppVisible"
            width="60%">
            <div style="display:flex">
                <appDetails :appId="sourceAppId"></appDetails>   
                <appDetails :appId="targetAppId"></appDetails>   
            </div>
        </el-dialog>
      
    </div>    
</template>

<script>
  import appDetails from './AppDetails'
  export default {
    components:{appDetails},
    props:{
        userType:{
            type:String,
            default:''
        }
    },
    data() {
      return {
        search:'',
        tableData: [],
        currentPage:1,
        pageSize:10,
        total:0,
        orderValue:'4',
        options: [{
          value: '1',
          label: '按活跃倒序排序'
        }, {
          value: '2',
          label: '按编辑倒序排序'
        }, {
          value: '3',
          label: '按录入顺序排序'
        }, {
          value: '4',
          label: '按SN码顺序排序'
        }],
        appVisible:false,
        preViewAppId:'', //预览appId
        copyFlg:false,
        targetAppId:'', //复制app目标Id
        targetAppName:'',
        copyAppVisible:false,
        sourceAppId:''//复制app源Id

      }
    },


    created(){
        this.getDeviceList()
    },
    methods: {
        getDeviceList(){
            //  this.$API.getDeviceList(this.currentPage,this.pageSize,this.search).then((res) => {
            //    if(res.data.errorcode === 1){
            //     this.tableData = res.data.data.data_list
            //     this.total = res.data.data.num_results
            //    }
            // })
            this.tableData =[
                {id:'1',
                sn:'ZJ1912CNA1002FF1A',
                statu:'活跃',
                created_time: '2020-04-02 12:52:35',
                active_time:'2020-04-02 14:52:35',
                update_time:'2020-04-02 15:52:35',
                name: '互动投影1111',        
                desc: '描述设备的地址等相关信息，16字。',
                group:'学布思哦哦哦公司',
                app_id:'1',
                app:'小恐龙绘本教育',
                }, {
                id:'2',
                sn:'ZJ191255YYYAS85O',
                    statu:'离线',
                created_time: '2020-04-04 12:52:35',
                active_time:'2020-04-02 12:52:35',
                update_time:'2020-04-03 12:52:35',
                name: '1234互动投影',
                desc: '基准尺寸1440*9000',
                group:'学布思公司',
                app_id:'2',
                app:'欧宝体感看书书'
                }, {
                    id:'3',
                sn:'ZJ1444CNA100P00L3',
                statu:'活跃',
                created_time: '2020-04-01 12:52:35',
                active_time:'2020-04-02 14:42:35',
                update_time:'2020-04-06 17:52:35',
                name: '互动投影aaaaaaaaaaaaa',
                desc: '这是一段描述，关于这个应用',
                group:'大龙公司',
                app_id:'3',
                app:'大龙教你做菜'
                }, {
                    id:'4',
                    sn:'ZJ1925HN1003RR5T',
                    statu:'活跃',
                created_time: '2020-04-03 14:52:35',
                active_time:'2020-04-06 15:22:35',
                update_time:'2020-04-08 17:32:35',
                name: '互动投影设备',
                desc: '这是一段描述',
                group:'绘本教育公司',
                app_id:'4',
                app:'小恐龙绘本教育'
                },{id:'5',
                sn:'ZJ1912CNA1002FF1A',
                statu:'活跃',
                created_time: '2020-04-02 12:52:35',
                active_time:'2020-04-02 14:52:35',
                update_time:'2020-04-02 15:52:35',
                name: '互动投影1111',        
                desc: '描述设备的地址等相关信息，16字。',
                group:'学布思哦哦哦公司',
                app_id:'5',
                app:'小恐龙绘本教育',
                }, {
                id:'6',
                sn:'ZJ191255YYYAS85O',
                    statu:'离线',
                created_time: '2020-04-04 12:52:35',
                active_time:'2020-04-02 12:52:35',
                update_time:'2020-04-03 12:52:35',
                name: '1234互动投影',
                desc: '基准尺寸1440*9000',
                group:'学布思公司',
                app_id:'6',
                app:'欧宝体感看书书'
                }, {
                    id:'7',
                sn:'ZJ1444CNA100P00L3',
                statu:'活跃',
                created_time: '2020-04-01 12:52:35',
                active_time:'2020-04-02 14:42:35',
                update_time:'2020-04-06 17:52:35',
                name: '互动投影aaaaaaaaaaaaa',
                desc: '这是一段描述，关于这个应用',
                group:'大龙公司',
                app_id:'7',
                app:'大龙教你做菜'
                }, {
                    id:'8',
                    sn:'ZJ1925HN1003RR5T',
                    statu:'活跃',
                created_time: '2020-04-03 14:52:35',
                active_time:'2020-04-06 15:22:35',
                update_time:'2020-04-08 17:32:35',
                name: '互动投影设备',
                desc: '这是一段描述',
                group:'绘本教育公司',
                app_id:'8',
                app:'小恐龙绘本教育'
                }]

                this.total = 8
        },

          //改变每页数量
        handleSizeChange(val){
            this.pageSize = val 
            this.getDeviceList(1)
         },
          //改变当前页数
        handleCurrentChange(val) {
            this.currentPage = val 
            this.getDeviceList()
        },

        //添加设备
        addDevice(){
            this.$router.push({ name: 'add-device',params:{type:'add'} })
        },

      //预览app
      preViewApp(id){
          this.appVisible =  true
          this.preViewAppId = id
      },

      //编辑/查看设备
      gotoDeviceDtl(deviceId,type){
        this.$router.push({ name: 'edit-device',params:{deviceId:deviceId,type:type} })
      },

      //选择复制app
      copyApp(app){
          this.copyFlg = true
          this.targetAppId = app.app_id
          this.targetAppName = app.app

      },

      //替换设备app
      copyDeviceApp(row){
          this.copyAppVisible  = true
          this.sourceAppId = row.app_id

            this.$confirm(`是否将设备“${row.name}”绑定的APP从“${row.app}”替换为“${this.targetAppName}”？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                let data = {id:row.id,app_id:this.targetAppId}
                console.log(data)
                //  this.$API.replaceApp(this.currentPage,this.pageSize,this.search).then((res) => {
                //    if(res.data.errorcode === 1){
                //     this.tableData = res.data.data.data_list
                //     this.total = res.data.data.num_results
                //    }
                // })

                 this.copyAppVisible  = false
                 this.copyFlg = false
                 this.getDeviceList()
            }).catch(() =>{
                 this.copyAppVisible = false
            });
      },

      setOrderValue(value){
          this.orderValue = value
      },
    
      //更多操作
      handleCommand(command){     
          if(command.type === 'query'){
              this.gotoDeviceDtl(command.id,'query')
          }else if(command.type === 'delete'){
            this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.deleteDevice(command.id)
            }); 
          }
      },

     

      //删除
      deleteDevice(id){
        this.$API.deleteProduct(id).then((res) => {
            if(res.data.errorcode === 1){
                this.$message.success('删除成功')    
                this.getDeviceList()              
            }else{
                this.$message.error(res.message);
            } 
        })
      },

      rowClick(row, column){
          if(column.label !== '操作' && column.label !== 'APP'){    
            this.gotoDeviceDtl(row.id,'query')
          }      
      }
    }
  }
</script>

<style scoped>

 

 
</style>
