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
                    <el-button v-if="type === 'edit'" @click="cancelEdit">取消</el-button>
                </div>
            </div>
        </div>
        <el-form label-width="80px" :rules="type !== 'query' ? rules :{}" :model="appInfo" size="middle">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="APP名称" prop="name">                   
                        <span v-show="!editFlg">{{appInfo.name}}</span>
                        <el-input v-show="editFlg" v-model="appInfo.name"></el-input>                 
                    </el-form-item>
                </el-col>
                <el-col :span="6" v-if="type === 'edit'">
                    <el-form-item label="创建时间" >                   
                        <span >{{appInfo.created_time}}</span>
                    </el-form-item>
                </el-col>
                  <el-col :span="6" v-if="type === 'edit'">
                    <el-form-item label="编辑时间" >                   
                        <span >{{appInfo.update_time}}</span>
                    </el-form-item>
                </el-col>                
            </el-row>     
            <el-form-item label="APP图标" prop="icon">    
                <!-- <img  v-show="!editFlg" :src="appInfo.icon"  :preview-src-list="[...appInfo.icon]" class="icon-img" />    -->
                 <el-image  v-show="!editFlg" :src="appInfo.icon" :preview-src-list="[...appInfo.icon]"  class="icon-img"></el-image>
    
                <el-upload 
                    v-show="editFlg"
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <el-image v-if="appInfo.icon" :src="appInfo.icon" class="icon-img" ></el-image>
                    <el-button size="small" class="el-icon-upload2">上传文件</el-button>
                    <div slot="tip" class="el-upload__tip">只支持PNG、JPEG格式，分辨率要求为64×64，上传大小不超过1M。</div>
                </el-upload>           
            </el-form-item>
            <el-form-item label="说明" prop="desc">      
                <el-row :gutter="20">
                    <el-col :span="8">             
                        <span v-show="!editFlg">{{appInfo.desc}}</span>
                        <el-input type="textarea" v-show="editFlg" v-model="appInfo.desc"></el-input>      
                    </el-col>  
                </el-row>             
            </el-form-item>         
            <el-divider></el-divider>
            <p>引导页面</p>  
            <el-form-item label="背景类型" prop="type">                   
                <span v-show="!editFlg">{{appInfo.type === 'img' ? '图片' :'视频'}}</span>      
                <el-radio-group v-show="editFlg" v-model="appInfo.type">
                    <el-radio label="img">图片</el-radio>
                    <el-radio label="video">视频</el-radio>
                </el-radio-group>                       
            </el-form-item>                
            <el-form-item  label="图片" v-if="appInfo.type === 'img'"  prop="src">
                <el-image  v-show="!editFlg" :src="appInfo.src" :preview-src-list="[...appInfo.src]"  class="content-img"></el-image>
                <el-upload  v-show="editFlg"                    
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="appInfo.src" :src="appInfo.src" class="content-img">
                    <el-button  size="small" class="el-icon-upload2">上传文件</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item  label="视频" v-else  prop="src">
                <video v-show="!editFlg" controls="controls" autoplay="autoplay"  class="content">
                    <source :src="appInfo.src" type="video/mp4">
                </video>
                <el-upload  v-show="editFlg"
                    class="avatar-uploader "
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <video  v-if="appInfo.video" controls="controls" autoplay="autoplay">
                        <source :src="appInfo.video" type="video/mp4">
                    </video>
                    <el-button v-else size="small" class="el-icon-upload2">上传文件</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item  label="背景音乐" >
                  <span v-show="!editFlg">{{appInfo.music}}</span>
                  <el-upload
                        v-show="editFlg"
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :file-list="musicList">
                        <span v-if="appInfo.music">{{appInfo.music}}</span>
                        <el-button  size="small" class="el-icon-upload2">上传文件</el-button>
                    </el-upload>
            </el-form-item>
            
     
            <el-divider></el-divider>
            <p>绑定设备</p>
            <el-form-item  label="已绑设备" prop="devices" >
                <el-select v-model="device" filterable placeholder="请选择" :disabled="!editFlg">
                    <el-option
                    v-for="item in deviceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="primary" size="middle" class="el-icon-circle-plus-outline" @click="bindDevice" :disabled="!editFlg">绑定该设备</el-button>         
            </el-form-item>  
         </el-form>    
          <div class="device-list margin-top-20" >
                <el-card v-for="(item,index) in appInfo.devices" :key="index">
                    <div  class="flex-between">
                        <div class="device-item">
                            <span>{{item.name}}</span>                           
                            <el-tooltip class="item " effect="dark" :content="item.sn" placement="top-start">
                                <div class="device-item-sn">SN</div>
                            </el-tooltip>
                        </div>
                        <div v-show="editFlg">
                            <el-divider direction="vertical"></el-divider>
                            <i class="el-icon-delete el-icon--right" @click="clearBind(item)"></i>
                        </div>
                    </div>                
                </el-card>
            </div>          
    </div>
</template>


<script>
export default {
    data() {      
      return {
        appId:'',
        appInfo:{},
        appInfo_temp:{},
        deviceList:[],
        editFlg:false,
        type:'',
        device:'',
        musicList:[],
        rules:{
            name:[{required:true,message:'请输入APP名称',trigger:'blur'}],
            icon:[{required:true,message:'请上传APP图标ICON',trigger:'blur'}],
            type:[{required:true,message:'请选择背景类型',trigger:'blur'}],
            src:[{required:true,message:'请上传图片或视频',trigger:'blur'}],
            devices:[{required:true,message:'请添加绑定设备',trigger:'blur'}],

        }, 
      }
    },
    watch: {
        editFlg: function () {
          // this.modelList.forEach(item => item.disabled = !this.editFlg)
        },
        appId:function(oldVal,newVal){
            if(oldVal !== newVal){
                this.init()
            }
        }
    },
    created(){
      
        this.init()
    },

    methods:{
         init(){
            this. getDeviceList()

            this.type = this.$route.params.type
            this.appId = this.$route.params.appId
            if(this.type !== 'query'){
                this.changeEditFlg()
            }
            if(this.type === 'add'){
               
                this.appInfo = {name:'',
                        desc:'',
                        app:'',
                        app_id:'',
                        devices:[],
                        music:'',
                        type:'img',
                        src:'',
                        icon:''
                        }
            }else{
                this.appInfo =  this.getAppInfo()
                this.appInfo_temp = JSON.parse(JSON.stringify(this.appInfo))
            }            
             
        },

        getAppInfo(){
            if(this.appId === '1'){
                 return {name:'学而思智能投影',
                desc:'对APP进行描述/介绍的文本，字数约100字（待定）。',
                created_time:'2020-03-31  09:11:32',
                update_time:'2020-03-31  10:00:02',
                app:'小恐龙绘本教育',
                app_id:'001',
                devices:[{id:'11',name:'学而思智能投影1'},{id:'22',name:'学而思智能投影2'},{id:'33',name:'学而思智能投影3'},{id:'44',name:'学而思智能投影4'}],
                music:'小恐龙战队.mp3',
                type:'img',
                src:'http://appstoretest.orbbec.me:10091/img/f8aef052fefd89562434d57483bb62f9.jpg',
                icon:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png'
                }
            }else{
                return {name:'学而思智能投影',
                        desc:'对APP进行描述/介绍的文本，字数约100字（待定）。',
                        created_time:'2020-03-31  09:11:32',
                        update_time:'2020-03-31  10:00:02',
                        app:'小恐龙绘本教育',
                        app_id:'001',
                        devices:[{id:'11',name:'学而思智能投影1'},{id:'22',name:'学而思智能投影2'},{id:'33',name:'学而思智能投影3'},{id:'44',name:'学而思智能投影4'}],
                        music:'小恐龙战队.mp3',
                        type:'video',
                        src:'http://appstoretest.orbbec.me:10091/img/f8aef052fefd89562434d57483bb62f9.jpg',
                        icon:'http://appstoretest.orbbec.me:10091/img/0712f3d0b4ed970c471b8890ac1aead5.png'
                    }
            }
           
        },
     
        changeEditFlg(){
            this.editFlg = true
            this.getDeviceList()

        },
        editSubmit(){

        },
        cancelEdit(){
            this.editFlg = false
            this.appInfo = JSON.parse(JSON.stringify(this.appInfo_temp))
        },
  
        getDeviceList(){
            this.deviceList = [{
                id: '001',
                name: '设备1',
                sn:'11111111111111111'
                }, {
                id: '002',
                name: '设备222222',
                sn:'2222222222222222222'

                }, {
                id: '003',
                name: '欧宝体感看书书设备',
                sn:'3333333333333333333'
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
        bindDevice(){    
            //添加展示   
            this.appInfo.devices.push(this.deviceList.filter(item => item.id === this.device)[0])

            //删除选项
             this.deviceList =  this.deviceList.filter(item => item.id !== this.device)
             this.device = ''
        },

        //解除绑定
        clearBind(deviceObj){
             //删除展示   
            this.appInfo.devices  = this.appInfo.devices.filter(item => item.id !== deviceObj.id)

            //添加选项
             this.deviceList.push({
                id: deviceObj.id,
                name: deviceObj.name,
                sn:deviceObj.sn
            })
        }
        
        
    }
}
</script>


<style scoped>
    

    .el-card{
        margin:0 20px 20px;
    }
    /deep/ .el-card__body{
        padding: 10px ;
    }
  
     .content video{
        height: 200px;
        width: 200px;
    }

</style>