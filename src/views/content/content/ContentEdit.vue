<template>
    <div name="edit-device">
        <div class="flex-between">
            <p>基本信息</p> 
            <div v-if="type !== 'query'">
                <div v-if="!editFlg">
                    <el-button type="primary" @click="changeEditFlg">编辑</el-button>
                </div>
                <div v-else>
                    <el-button type="primary" @click="editSubmit">提交</el-button>
                    <el-button  v-if="type === 'edit'" @click="cancelEdit">取消</el-button>
                </div>
            </div>
        </div>
        <el-form label-width="80px" :rules="type !== 'query' ? rules :{}" :model="contentInfo">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="内容名称" prop="name">                   
                        <span v-show="!editFlg">{{contentInfo.name}}</span>
                        <el-input v-show="editFlg" v-model="contentInfo.name"></el-input>                 
                    </el-form-item>
                </el-col>
                <el-col :span="6" v-if="type === 'edit'  && !editFlg">
                    <el-form-item label="创建时间" >                   
                        <span >{{contentInfo.created_time}}</span>
                    </el-form-item>
                </el-col>
                  <el-col :span="6" v-if="type === 'edit'   && !editFlg">
                    <el-form-item label="编辑时间" >                   
                        <span >{{contentInfo.update_time}}</span>
                    </el-form-item>
                </el-col>                
            </el-row>     
            <el-form-item label="主图片" prop="src">     
                <el-image   v-show="!editFlg" :src="contentInfo.src" :preview-src-list="[...contentInfo.src]"  class="content-img"></el-image>                                        
                <el-upload 
                    v-show="editFlg"
                    action=""
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <el-image   v-if="contentInfo.src" :src="contentInfo.src"  class="content-img"></el-image>                                        
                    <el-button size="small" class="el-icon-upload2">上传文件</el-button>
                    <div slot="tip" class="el-upload__tip">只支持PNG、JPEG格式，分辨率要求为640×300，上传大小不超过4M。</div>
                </el-upload>           
            </el-form-item>
            <el-form-item label="描述" prop="desc">                   
                <span v-show="!editFlg">{{contentInfo.desc}}</span>
                <el-input type="textarea" v-show="editFlg" v-model="contentInfo.desc"   maxlength="30" show-word-limit  style="width:500px"></el-input>                 
            </el-form-item>         
            <el-divider></el-divider>
            <p>模型</p>  
            <el-form-item label="模型" prop="modelId">   
                 <span v-show="!editFlg">{{select_model.name}}</span>  
                 <el-select v-show="editFlg" v-model="modelId" filterable placeholder="请选择模型" :disabled="!editFlg" @change="changeModel">
                    <el-option
                        v-for="item in modelList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>                                                          
            </el-form-item>   
             <el-form-item label="模型图片" >     
                <el-image  :src="select_model.src" :preview-src-list="[...select_model.src]"  class="content-img"></el-image>                                        
            </el-form-item>              
                
            <el-divider></el-divider>
            <p>展示内容</p>
            <el-form-item label="示意图">
                <div class="flex">
                    <div class='demo'>
                        <img src="../../../assets/img/content-demo1.png"/>
                        <div class="desc">
                            注：该示意图为识别物体后的目录层级，左侧虚框为物体识别区域，虚
                            框下为该物品的简介，对应基本信息里的主图片和描述；内容不限制个
                            数，右侧目录每页展示四个内容，可分别填充图片或视频，手势或遥控
                            器可翻页（可在前端再配置虚拟按钮）。
                        </div>              
                    </div>
                    <div class='demo'>
                        <img src="../../../assets/img/content-demo2.png"/>
                        <div class="desc">
                           示意图2：该示意图左侧虚框为物体识别区域，虚框下为该物品的简
                           介，对应基本信息里的主图片和描述；右侧为单个内容的全区域显
                           示。（引导到时候注意添加商品和绘本的配置引导）
                        </div>               
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="展示内容">
                <el-button type="primary" class="el-icon-circle-plus" size="small" @click="addContent" :disabled="contentList.length === 4 || !editFlg">增加展示位({{contentList? contentList.length:0}}/4)</el-button>
                <div class="flex">
                   <el-card :body-style="{ padding: '0px' ,width:'350px'}" v-for="(item,index) in contentList" :key="index">
                       <i class="el-icon-circle-close" @click="deleteContent(index)" v-show="editFlg"> </i>
                       <el-upload  v-show="editFlg"                    
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="item.type === 'img'" :src="item.src" class="image">
                            <video v-else controls="controls" autoplay="autoplay"  class="image">
                                <source :src="item.src" type="video/mp4">
                            </video>
                            <el-button  size="small" class="el-icon-upload2">上传文件</el-button>
                        </el-upload>
                        <div v-show="!editFlg"> 
                            <img v-if="item.type === 'img'" :src="item.src" class="image"  >
                            <video v-else controls="controls" autoplay="autoplay"  class="image">
                                <source :src="item.src" type="video/mp4">
                            </video>
                        </div>
                        <div style="padding: 14px;">
                            <el-form>
                                <el-form-item label="类型">
                                     <span v-show="!editFlg">{{item.type === 'img' ? '图片':'视频'}}</span>
                                     <el-radio-group v-show="editFlg" v-model="item.type">
                                        <el-radio label="img">图片</el-radio>
                                        <el-radio label="video">视频</el-radio>
                                    </el-radio-group>   
                                </el-form-item>
                                <el-form-item label="名称">
                                   <span v-show="!editFlg">{{item.name}}</span>
                                    <el-input v-show="editFlg" v-model="item.name"></el-input>
                                </el-form-item>
                                <el-form-item label="音乐" v-if="item.type ==='img'">
                                    <span v-show="!editFlg">{{item.music}}</span>
                                    <el-input v-show="editFlg" v-model="item.music"></el-input>
                                </el-form-item>
                                 <el-form-item label="说明">
                                     <span v-show="!editFlg">{{item.desc}}</span>
                                      <el-input  type="textarea" v-show="editFlg" v-model="item.desc"></el-input>
                                </el-form-item>
                            </el-form>   
                        </div>
                    </el-card>
                </div>    
            </el-form-item>        
         </el-form>             
    </div>
</template>


<script>
export default {
    data() {      
      return {
        appId:'',
        contentInfo:{},
        contentInfo_temp:{},
        modelList:[],
        select_model:{id:'',name:'',src:''},
        modelId:'',
        editFlg:false,
        type:'',
        device:'',
        musicList:[],
        rules:{
            name:[{required:true,message:'请输入内容名称',trigger:'blur'}],
            src:[{required:true,message:'请上传内容主图片',trigger:'blur'}],
            modelId:[{required:true,message:'请选择模型',trigger:'blur'}],
            src:[{required:true,message:'请上传图片或视频',trigger:'blur'}],
            devices:[{required:true,message:'请添加绑定设备',trigger:'blur'}],
        },
        contentList:[] 
      }
    },
    watch: {
        editFlg: function () {
           this.modelList.forEach(item => item.disabled = !this.editFlg)
        },
        appId:function(oldVal,newVal){
            if(oldVal !== newVal){
                this.init()
            }
        }
    },
    created(){
        this.type = this.$route.params.type
        this.appId = this.$route.params.appId
        if(this.type !== 'query'){
            this.changeEditFlg()
        }
        this.init()
    },

    methods:{
         init(){
            this.getModelList()
            if(this.type !== 'add'){
                this.contentInfo =  this.getContentInfo()
                this.contentInfo_temp =  JSON.parse(JSON.stringify(this.contentInfo ))
                this.select_model = this.contentInfo.model
                this.contentList = this.contentInfo.content
            }else{
                this.contentInfo = {
                        name:'',
                        desc:'',
                        model:{id:'',name:'',src:''}
                }  
                this.select_model = this.modelList[0]        
            }

            this.modelId = this.select_model.id
                              
        },

        getContentInfo(){
            if(this.appId === '1'){
                 return {name:'学而思智能投影',
                desc:'对APP进行描述/介绍的文本，字数约100字（待定）。',
                src:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png',
                created_time:'2020-03-31  09:11:32',
                update_time:'2020-03-31  10:00:02',       
                model:{id:'001',name:'模型1',src:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'},
                content:[]
              
                }
            }else{
                return {name:'学而思智能投影',
                        desc:'对APP进行描述/介绍的文本，字数约100字（待定）。',
                         src:'http://appstoretest.orbbec.me:10091/img/6507aee0bd0e1222e1232db8be8164f1.png',
                        created_time:'2020-03-31  09:11:32',
                        update_time:'2020-03-31  10:00:02',
                        model:{id:'002',name:'测色水水飒飒的',src:'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'},
                        content:[{type:'img',name:'小恐龙的故乡',music:'恐龙战队.mp3',
                        src:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                        desc:'这是一段关于该展示位的说明，点击展示位进入二级页面后显示，字数支持100字以内。'},{type:'',name:'小恐龙的故乡',
                        src:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                        desc:'这是一段关于该展示位的说明，点击展示位进入二级页面后显示，字数支持100字以内。'},]
                    }
            }
           
        },
        
        changeEditFlg(){
            this.editFlg = true
            this.getModelList()

        },
        editSubmit(){

        },
        cancelEdit(){
            this.editFlg = false
            this.contentInfo = JSON.parse(JSON.stringify(this.contentInfo_temp))
             this.contentList =  this.contentInfo.content 
        },
  
        getModelList(){
            this.modelList = [{
                id: '001',
                name: '模型1',
                src:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
                }, {
                id: '002',
                name: '模型22222222222',
                src:'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'

                }, {
                id: '003',
                name: '测试模型',
                src:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
            }]
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        changeModel(id){
            this.modelId = id
            this.select_model = this.modelList.filter(item => item.id === this.modelId)[0]

        },
        addContent(){
            let arr = [{type:'img',name:'',music:'',
                        src:'',
                        desc:''}]
            if(this.contentList.length < 3){
                this.contentList.push(arr) 
                this.contentList.push(arr)
            }else{
                this.contentList.push(arr) 
            }
            
        },
        deleteContent(delete_index){
            this.contentList = this.contentList.filter((item,index) => index !== delete_index)
        }
                  
    }
}
</script>


<style scoped>
.demo{
    width: 400px;
    margin-right: 50px;
    line-height: 25px;
} 

.image{
    width: 100%;
    height: 300px;
}

.el-card {
    position: relative;
}
.el-icon-circle-close{
    position: absolute;
    right: 0px;
    font-size: xx-large;
}



</style>