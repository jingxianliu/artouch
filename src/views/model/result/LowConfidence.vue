<template>
    <div class="low-confidence flex-column">   
        <el-divider>{{modelObj.time}}</el-divider>
        <div class="main">
            <div class="delete-btn">
                <el-button type="danger" icon="el-icon-delete " circle @click="comfim('del')"></el-button>
            </div>
            <el-card>
                <div class="flex">  
                    <div class="main-left">
                        <el-image  :src="modelObj.imgUrl" fit="fill"></el-image>
                    </div>
                    <div class="main-right">
                        <el-form  label-width="90px" >
                            <el-form-item label="自动识别:" >
                                <div class="img-box">
                                    <div v-for="(item,index) in modelObj.pictureList" :key="index" class="align-center img-item">
                                        <div class="img-card">
                                            <el-image                                                                
                                                :src="item.src" 
                                                :preview-src-list="[...item.src]">
                                            </el-image>
                                            <div class="font-size-12 text">{{item.name}}</div>
                                            <div class="font-size-12 text">{{item.persent}}</div>
                                        </div>
                                        <el-button type="primary" size="mini" @click="comfim('check',item)">正确</el-button>
                                    </div>                  
                                </div> 
                            </el-form-item>
                            <el-form-item label="人为标注:"   >
                                <div>
                                    <el-select size="mini" v-model="modelId">
                                        <el-option
                                        v-for="item in modelOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <div class="width-100 align-center">
                                        <div class="img-card">
                                            <el-image                                                                
                                                :src="modelObj.imgUrl" 
                                                :preview-src-list="[...modelObj.imgUrl]">
                                            </el-image>
                                            <div class="text">肖恩 </div>
                                        </div>
                                        <el-button type="primary" size="small" @click="comfim('add')">重新分类</el-button>
                                    </div>                
                                </div>
                            </el-form-item>                          
                        </el-form>
                    </div>
            
                </div>
                <div class="flex btn-box">             
                    <div class="btn" >
                        <el-button type="text" :disabled=" index === 0 " @click="getPre">  {{ index === 0 ? '已经是第一张了' :'上一张'}}</el-button>                  
                    </div>
                    <div class="btn" >
                           <el-button type="text" :disabled=" index === modelList.length-1" @click="getNext">  {{ index === modelList.length-1 ? '已经是最后一张了' :'下一张'}}</el-button>
                        <!-- {{ index === modelList.length-1 ? '已经是最后一张了' :'上一张'}} -->
                    </div>                          
                </div>
            </el-card>
        </div>
    </div>     
</template>


<script>
export default {
    data(){
        return {
            modelList:[],
            modelObj:{},
            modelId:'',
            modelOptions:[]
        }
    },
    created(){
        this.getModelList()
        this.getModelOptions()

    },
    computed:{
        index:function(){
            return this.modelList.findIndex(item => item.id === this.modelObj.id)
        },
        // pictureList:function(){
        //     return  [
        //         {name:'图片1',persent:'30%',checked:false,src:this.modelList[index].imgUrl},
        //         {name:'图片2',persent:'30%',checked:false,src:this.modelList[index].imgUrl},
        //         {name:'图片3',persent:'30%',checked:false,src:this.modelList[index].imgUrl},
        //         {name:'图片4',persent:'30%',checked:false,src:this.modelList[index].imgUrl},
        //         {name:'图片5',persent:'30%',checked:false,src:this.modelList[index].imgUrl}, 
        //     ]
        // }
    },
    methods:{
        getModelList(){

            this.pictureList = [
                {name:'图片',persent:'30%',checked:false,src:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'},
                {name:'图片图片',persent:'30%',checked:false,src:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'},
                {name:'图片图片',persent:'30%',checked:false,src:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'},
                {name:'图片啊啊啊啊',persent:'30%',checked:false,src:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'},
                {name:'测试测试测',persent:'30%',checked:false,src:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'},           
            ]

        

            this.modelList =[
                {id:'1',name:'模型1',imgUrl:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',pictureList:this.pictureList,time:'2020-04-02 15:55:32'},
                {id:'2',name:'模型2',imgUrl:'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',pictureList:this.pictureList,time:'2020-04-03 15:55:32'},
                {id:'3',name:'模型3',imgUrl:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',pictureList:this.pictureList,time:'2020-04-04 15:55:32'},
                {id:'4',name:'模型4',imgUrl:'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',pictureList:this.pictureList,time:'2020-04-05 15:55:32'},
                {id:'5',name:'模型5',imgUrl:'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',pictureList:this.pictureList,time:'2020-04-06 15:55:32'},
                {id:'6',name:'模型6',imgUrl:'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',pictureList:this.pictureList,time:'2020-04-07 15:55:32'},
                {id:'7',name:'模型7',imgUrl:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',pictureList:this.pictureList,time:'2020-04-08 15:55:32'},
                {id:'8',name:'模型8',imgUrl:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',pictureList:this.pictureList,time:'2020-04-09 15:55:32'},
                {id:'9',name:'模型9',imgUrl:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',pictureList:this.pictureList,time:'2020-04-10 15:55:32'},
                {id:'10',name:'模型10',imgUrl:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',pictureList:this.pictureList,time:'2020-04-11 15:55:32'},
                {id:'11',name:'模型11',imgUrl:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',pictureList:this.pictureList,time:'2020-04-11 15:55:32'},
                {id:'12',name:'模型12',imgUrl:'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',pictureList:this.pictureList,time:'2020-04-13 15:55:32'},
            ]
             this.modelObj = this.modelList[0]
           
        },

        getModelOptions(){
            this.modelOptions=[
                {id:'1',name:'模型1'},
                {id:'2',name:'模型2'},
                {id:'3',name:'模型3'},
                {id:'4',name:'模型4'}
            ]

        },

        //上一张
        getPre(){
            this.modelObj = this.modelList[(this.index - 1)]
        },

        //下一张
        getNext(){
          this.modelObj = this.modelList[(this.index + 1)]

        },

        comfim(type,obj){
            let msg = ""
            if(type === 'del'){
                msg = "此操作将永久删除该素材, 是否继续?"
            }else if(type === 'check'){
                msg = `此操作将该素材自动识别为${obj.name}, 是否继续?`
            }else if(type === 'add'){
                  
                if (this.modelId) {
                    msg = `此操作将该素材人为标注为模型${this.modelOptions.filter(item => item.id ===  this.modelId)[0].name}, 是否继续?`
                }else{
                    this.$message({
                        message: '请选择标注模型',
                        type: 'warning'
                    })
                    return 
                }
               
               
            }

            this.$confirm(msg, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                  if(type === 'del'){
                      this.deletePicture()
                }else if(type === 'check'){
                    this.checkPicture()
                }else if(type === 'add'){
                    this.addToModel()
                }
            }); 

        },
        //删除图片
        deletePicture(){
            this.$message.success('删除成功')           
            
            // this.$API.deletePicture(1).then((res) => {
            //     if(res.data.errorcode === 1){
            //         this.$message.success('删除成功')    
            //         this.getDeviceList()              
            //     }else{
            //         this.$message.error(res.message);
            //     } 
            // })
            this.dealPictureSuccess()
        },

        //自动识别
        checkPicture(){
            
            this.$message.success('自动识别操作成功')  
        
            // this.$API.checkPicture(1).then((res) => {
            //     if(res.data.errorcode === 1){
            //         this.$message.success('删除成功')    
            //         this.getDeviceList()              
            //     }else{
            //         this.$message.error(res.message);
            //     } 
            // })
           
            this.dealPictureSuccess()

        },

        //重新分类
        addToModel(){
            this.$message.success('人为标注操作成功')  

            // this.$API.addToModel(1).then((res) => {
            //     if(res.data.errorcode === 1){
            //         this.$message.success('删除成功')    
            //         this.getDeviceList()              
            //     }else{
            //         this.$message.error(res.message);
            //     } 
            // })

            this.dealPictureSuccess()        
        },
        dealPictureSuccess(){
            this.$emit('dealPictureSuccess')
            this.getNext()
            this.modelList = this.modelList.filter(item => item.id !== this.modelObj.id)
        }
    }
}
</script>

<style scoped>
    .low-confidence{   
        align-items: center;
        width: 80%;
        margin: 0 10% ;
    }

    .flex-column{
        display: flex;
        flex-direction:column;
    }
    .main{
        position: relative;
        width: 100%;
    }

    .delete-btn{
        position: absolute;
        right: -20px;
        top: -20px;
    }
    .main-left{
        width: 70%;
    }

    .main-right{
        width:30%
    }
    .el-image{
        width: 100%;
    }
   

    .img-box{
        display: flex;
        flex-wrap: wrap;
    }

     .img-item{
        width: 33.33%;
        padding: 0px;
    }

    .text{
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }
    
    .img-card{
        box-shadow: 0px 2px 2px 0px rgba(0,0,0,.1);
        margin: 5px 5px 10px;   
    }
  
    .btn-box{
        height: 100px;
        align-items: center;
        box-shadow: 0px 2px 12px 0px rgba(0,0,0,.1)
    }
    .btn-box .btn{
        width: 50%;
        text-align: center;
        height: 100%;
        line-height: 100px;
    }
    .btn-box .btn:first-child{
        border-right: 1px solid #ccc;
    }
</style>