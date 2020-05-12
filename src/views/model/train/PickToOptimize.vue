<template>
    <div>   
        <el-form  ref="ruleForm" label-width="100px" size="small">
            <el-form-item label="模型名称" >
                <span>{{model.name}}</span>
            </el-form-item>
            <el-form-item label="选择素材" v-if="type === 'pick'">
                <el-select v-model="value" filterable placeholder="输入素材名称进行检索">
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="primary" size="small" @click="addToModel">增加素材</el-button>
                <span v-if="type === 'pick'">目前共选定{{allCount}}张图片</span>
            </el-form-item>
        <el-form-item  >
            <el-button v-for="(item,index) in model.materialList"  :key="index" @click="showPicList(item)" :class="item.name === '识别结果' && type ==='pick' ? 'el-icon-picture-outline-round':''">{{item.name}}</el-button>             
        </el-form-item>
        </el-form>
        <el-divider >{{this.model.cteated_date}}</el-divider>
            <div class="flex-between-center">  
                <div>
                    <el-button :class="material.name !== '识别结果' && type ==='pick'? 'el-icon-delete':''" type="text" @click="removeFromModel">{{this.material.name}} </el-button>
                     <span v-if="type === 'pick'">{{`${this.chekcedLength}/`}}</span><span>{{material.num}}</span>
                </div>
                <el-checkbox  v-if="type === 'pick' && material.name !== '识别结果'" v-model="checkAll"  :indeterminate="isIndeterminate"  @change="handleCheckAllChange">全选</el-checkbox>
        </div>
        <div class="img-box">                
            <div  v-for="(item,index) in material.pictureList" :key="index" class="img-item">          
                <img  :src="item.src" class="img"/>
                <el-button  v-if="type === 'pick'  && material.name === '识别结果'  " size="mini" @click="reCheck(item)">重新审核</el-button>
                <el-checkbox  v-if="type === 'pick' && material.name !== '识别结果'" v-model="item.checked" @change="handleCheckChange"></el-checkbox>

            </div>
        </div>
    </div>   
</template>

<script>
export default {
    props:{
        model:{
            type:Object,
            default:() => ({})
        }, 
        type:{
            type:String,
            default:''
        }  
    },
    data(){
        return {
            checkAll:true,
            checkedImg:[],
            chekcedLength:0,
            options: [],
            value: '',
            material:{},
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
        },
        allCount:{
            get(){
                let  s = 0;
                this.model.materialList.forEach(item => {
                    s += item.num;
                });
                return s
            },
            set(val){          
                
            },
      
        } ,
    },
    watch:{
        model:{
            handler:function(){
                this.init()
            }
        },
        'model.materialList': {
            handler: function(){   
                if(this.model) {
                    this.model.materialList.forEach(item => {
                        this.allCount += item.num;
                    });  
                }                        
            }  ,               
            // 深度观察监听
            deep: true
         },
         
    },
    created(){
        this.init()
        this.getOptions()
    },
    methods:{
        init(){
            this.model.materialList = [
                {id:'00',name:'识别结果',num:163,pictureList:[]},
                {id:'10',name:'素材1',num:57,pictureList:[]},
                {id:'11',name:'素材2',num:88,pictureList:[]},
                {id:'12',name:'素材3',num:32,pictureList:[]},
            ]  
            this.showPicList(this.model.materialList[0])
        },

        getOptions(){
            this.options = [{
                id: '1',
                name: '素材素材素材素材素材A',
                num:123,
                pictureList:[]
                }, {
                id: '2',
                name: '素材素材素材素材素材B',
                num:32,
               
               pictureList:[]
                }, {
                id: '3',
                name: '素材素材素材素材素材C',
                num:64,
                 pictureList:[]
                }, {
                id: '4',
                name: '素材素材素材素材D',
                num:60,
                 pictureList:[]
                }, {
                id: '5',
                name: '素材E',
                num:25,
                 pictureList:[]
            }]
        },

        showPicList(material){
            this.material = JSON.parse(JSON.stringify(material))

             for (let i = 1; i <= material.num; i++) {
                this.material.pictureList.push({
                    id: i,
                    src: 'http://appstoretest.orbbec.me:10091/img/8d50bd603654cf55a3669ebfc5ef2603.png',
                    checked:true
                });
            } 
            
            this.chekcedLength = this.material.pictureList.length    

        },

        addToModel(){
            //添加
             this.model.materialList.push(this.options.filter(item => item.id === this.value)[0])

            //从选择下拉框删除
            this.options =   this.options.filter(item => item.id !== this.value)
            this.value = ''
          
        },

        removeFromModel(){

            this.$confirm('此操作将该素材回归到素材列表里, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                 //添加到可选列表
                this.options.push({id:this.material.id,name:this.material.name, num:this.material.num, pictureList:this.material.pictureList})

                //删除
                this.model.materialList = this.model.materialList.filter(item => item.id !== this.material.id)
                this.showPicList(this.model.materialList[0])            
            }); 
           
        },
        //点击全选按钮
        handleCheckAllChange(val){
            
            if(val){
                this.material.pictureList.forEach(item => item['checked'] = true)
                this.chekcedLength = this.material.pictureList.length
            }else{
                this.material.pictureList.forEach(item => item['checked'] = false)
                this.chekcedLength = 0
            }
        },

        //点击多选按钮
        handleCheckChange(val){
            //根据已选类型，判断全选的状态
            this.chekcedLength  = this.material.pictureList.filter(item => item['checked']  === true).length
            let length = this.material.pictureList.length
            this.chekcedLength === length ? this.checkAll = true : this.checkAll = false
        },
        //重新审核
        reCheck(obj){
             this.$confirm('此操作将该素材加入到低可信度列表, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                console.log('加入低可信度')  
                this.material.pictureList = this.material.pictureList.filter(item => item.id !=  obj.id)
            }); 
        }
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

   .el-dialog__body{
       padding-top: 10px;
   }
</style>