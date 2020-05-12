<template>
    <div>   
         <div class="flex" v-if="type === 'pick'">
                <p class="model-name"><span>模型名称</span></p>
                <el-input v-model="model_name"></el-input>
        </div>
        <p v-if="type === 'pick'">挑选素材</p>
        <el-divider >{{this.material.cteated_date}}</el-divider>
            <div class="flex-between-center">  
            <p>{{this.material.name}} {{`${this.chekcedLength}/${this.material.num}`}}</p>
            <el-checkbox  v-if="type === 'pick'" v-model="checkAll"  :indeterminate="isIndeterminate"  @change="handleCheckAllChange">全选</el-checkbox>
        </div>
        <div class="img-box">                
            <div  v-for="(item,index) in material.pictureList" :key="index" class="img-item">          
                <img  :src="item.src" class="img"/>
                <el-checkbox  v-if="type ==='pick'"  v-model="item.checked" @change="handleCheckChange"></el-checkbox>
            </div>
        </div>
    </div>   
</template>

<script>
export default {
    props:{
        type:{
            type:String,
            default:''
        },
        material:{
            type:Object,
            default:() => ({})
        },
    
    },
    data(){
        return {
            model_name:'',
            checkAll:true,
            checkedImg:[],
            chekcedLength:0,
        }
    },
    computed:{
        isIndeterminate:{
            get(){
                return !this.checkAll
            },
            set(val){
                this.checkAll = !val
            },
        }
          
    },
    watch:{
         material: {
            handler: function(val, oldVal){ 
                if(val !== oldVal){
                    this.init()
                }            
            },
            // 深度观察监听
            deep: true
        }
    },
    created(){
            this.init()
      
        
    },
    methods:{
        init(){
            this.chekcedLength = this.material.pictureList.length
        },
        //改变全选状态
        handleCheckAllChange(val){
            
            if(val){
                this.material.pictureList.forEach(item => item['checked'] = true)
                this.chekcedLength = this.material.pictureList.length
            }else{
                this.material.pictureList.forEach(item => item['checked'] = false)
                this.chekcedLength = 0
            }
        },

        handleCheckChange(val){
            //根据已选类型，判断全选的状态
            this.chekcedLength  = this.material.pictureList.filter(item => item['checked']  === true).length
            let length = this.material.pictureList.length
            this.chekcedLength === length ? this.checkAll = true : this.checkAll = false
        },
    }
}
</script>


<style  scoped>
 .img{
        width: 100%;
        margin-bottom: 10px;
   }

   .model-name{
       width: 100px;
   }
   .model-name::before{
       content: '*';
        position: relative;
        color: red;
        left: -5px;
   }
</style>