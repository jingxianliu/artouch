<template>
    <div name="high-confidence">
        <div class="header"> 
            <p>当前待审核的识别结果为{{list.length}}个，已选中{{chekcedLength}}个</p>
            <el-checkbox v-model="checkAll"  :indeterminate="isIndeterminate"  @change="handleCheckAllChange">全选</el-checkbox>
        </div> 
        <div class="main">
            <div v-for="(item,index) in list" :key="index" class="img-item">
                <el-card>
                    <div class="img-box">
                        <el-image :src="item.src" :preview-src-list="[...item.src]"></el-image>
                        <el-checkbox v-model="item.checked"   @change="handleCheckChange" class="check-box"></el-checkbox>
                    </div>
                    <div class="align-center">
                        <div class="margin-top-10">{{item.name.length > 10 ? `${item.name.substr(0,10)}...`:item.name.substr(0,10)}}</div>
                        <div class="margin-top-10">{{item.persent}}</div>
                    </div>
                </el-card>
                <el-divider><span >{{item.time}}</span></el-divider>
            </div>
        </div>   
        <div class="foot">
            <el-button size="middle" type="warning" v-if="chekcedLength === 0" @click="submit">所有结果置为低可信</el-button>
            <el-button size="middle" type="primary" v-else @click="submit">识别正确</el-button>
        </div>        
    </div>   
</template>

<script>
export default {
    data(){
        return{
            checkAll:true,
            list:[
                
            ],
            chekcedLength:0

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

    created(){
        this.init()
    },

    methods:{
        init(){
            this.list = [
                {name:'大象模型1',persent:'96%',time:'2020-04-13  23:12:00',checked:true,src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'},
                {name:'大象模型2',persent:'96%',time:'2020-04-13  23:12:00',checked:true,src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'},
                {name:'大象模型3',persent:'96%',time:'2020-04-13  23:12:00',checked:true,src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'},
                {name:'大象模型4',persent:'96%',time:'2020-04-13  23:12:00',checked:true,src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'},
                {name:'大象模型5',persent:'96%',time:'2020-04-13  23:12:00',checked:true,src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'},
                {name:'大象模型6',persent:'96%',time:'2020-04-13  23:12:00',checked:true,src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'},
                {name:'大象模型7',persent:'96%',time:'2020-04-13  23:12:00',checked:true,src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'},
                {name:'大象模型8',persent:'96%',time:'2020-04-13  23:12:00',checked:true,src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'},
                {name:'大象模型9',persent:'96%',time:'2020-04-13  23:12:00',checked:true,src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'},
                {name:'大象模型10',persent:'96%',time:'2020-04-13  23:12:00',checked:true,src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'},
                {name:'大象模型11',persent:'96%',time:'2020-04-13  23:12:00',checked:true,src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'},
                {name:'大象模型12',persent:'96%',time:'2020-04-13  23:12:00',checked:true,src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'},
                // {name:'大象模型',persent:'96%',time:'2020-04-13  23:12:00',checked:true},  
                // {name:'大象模型',persent:'96%',time:'2020-04-13  23:12:00',checked:true},
                // {name:'大象模型',persent:'96%',time:'2020-04-13  23:12:00',checked:true},
                // {name:'大象模型',persent:'96%',time:'2020-04-13  23:12:00',checked:true},
                // {name:'大象模型',persent:'96%',time:'2020-04-13  23:12:00',checked:true},
                // {name:'大象模型',persent:'96%',time:'2020-04-13  23:12:00',checked:true},
                // {name:'大象模型',persent:'96%',time:'2020-04-13  23:12:00',checked:true},
                // {name:'大象模型',persent:'96%',time:'2020-04-13  23:12:00',checked:true}
            ]

            this.chekcedLength = this.list.length
        },
        handleCheckAllChange(val){
            if(val){
                this.list.forEach(item => item['checked'] = true)
                this.chekcedLength = this.list.length
            }else{
                this.list.forEach(item => item['checked'] = false)
                this.chekcedLength = 0
            }
        },
        handleCheckChange(){
            //根据已选类型，判断全选的状态
            this.chekcedLength  = this.list.filter(item => item['checked']  === true).length
            let length = this.list.length
            this.chekcedLength === length ? this.checkAll = true : this.checkAll = false
        },

        submit(){
            if(this.chekcedLength === 0){//所有结果置为低可信度
                console.log('所有结果置为低可信度')
            }else{
                 let highArr = this.list.filter(item => item['checked']  === true)
                 let lowArr = this.list.filter(item => item['checked']  !== true)
                 console.log(`高可信度${highArr.length}`)
                 console.log(`低可信度${lowArr.length}`)

            }
        }

    }
}
</script>

<style scoped>
 .header{
     display: flex;
    align-items: center;
    justify-content: flex-end;
 }
 .header p{
     margin-right: 50px;
 }

 .main{
     display: flex;
     flex-wrap: wrap;
 }

 .foot{
     text-align: right;
 }

 .el-divider span{
     display: inline-block;
     width: 135px;
 }

 .img-item{
     padding: 0px 10px;
 }

 .img-box{
     position: relative;
 }

 .img-box img{
     width: 100%;
 }

 .check-box{
    position: absolute;
    right: 0px
 }


 .el-card__body{
     padding-bottom: 10px;
 }
</style>