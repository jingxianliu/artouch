<template>
    <div class="upload">
        <div>头像</div>
        <img  :src="url" class="img">
        <el-upload          
            action=""
            :show-file-list="false"
            :auto-upload="false"
            :multiple="false"
            :on-change="changeImg">
            <el-button size="small" class="el-icon-upload2">更改头像</el-button>
        </el-upload> 
    </div>
    
</template>
<script>
 export default {
    props:{
        imageUrl:{
            type:String,
            default:''
        }
    },
    data(){
        return{
           // url:'data:image/png;base64,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'
            url:''
        }
    },
    watch:{
        imageUrl: {
            handler: function(val, oldVal){ 
                if(val !== oldVal){
                    this.url = val              
                }        
            },
            // 深度观察监听
            deep: true
        } 
    },
    created(){
        this.url = this.imageUrl              
    },

    methods:{
    
        changeImg(file) {
            const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
            const isLt2M = file.raw.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式/png格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }

            if(isJPG && isLt2M){
                this.url = URL.createObjectURL(file.raw);
                this.$emit('success',file.raw)
            }
        }
    }

}

</script>


<style scoped>
  .upload{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 50px;
  }

  .img {
    width: 150px;
    height: 150px;
    margin: 30px 0;
    border-radius: 50%;
    display: block;
  }
</style>