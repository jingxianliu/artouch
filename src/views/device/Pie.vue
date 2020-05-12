<template>
    <el-card >
        <div class="flex-between">
            <div v-if="type !== '3'">
                <p class="circle margin-top-20"><span>{{ type === '1' ? '素材总数' :'模型总数'}}</span></p>
                <p class="p-num font-size-24">{{object.num1 }}</p>
                <p :class="['circle', 'margin-top-20',`circle-${type}`]"><span>{{ type === '1' ? '已训练素材数' :'内容数'}}</span></p>
                <p class="p-num font-size-24">{{object.num2 }}</p>
            </div>     
            <div v-else>
               <div class=" margin-top-10 margin-bottom-20"><span class="font-size-18">待审核的识别结果</span></div>
               <div class=" margin-top-10 bfc-parent">
                    <p class="circle "><span>待审核总数</span><span>{{object.num1 }}</span></p>
                    <p class="circle circle-3 "><span>高可信度</span><span>{{object.num2 }}</span></p>
                    <p class="circle circle-4 "><span>低可信度</span><span>{{object.num1  - object.num2}}</span></p>
               </div>
            </div>    
            <div class="align-center">
                <div ref="myChart" :style="{width: '160px', height: '160px'}"></div>
                <span> {{type === '1' ? '已训练素材占比' : type === '2' ? '已配置内容的模型占比':'高可信度识别结果占比'}}</span>
            </div>
        </div>   
    </el-card>         
</template>

<script>
export default {
    props:{      
        object:{
            type:Object ,
             default:() =>({
                num1:{
                    type:Number,
                    default:0
                },
                num2:{
                    type:Number,
                    default:0
                }
            })
        },
       
        type:{
            type:String,
            default:''
        }
    },

    mounted(){
        this.init()
    },
    methods:{
         init(){
            this.$nextTick(()=>{
                // 基于准备好的dom，初始化echarts实例
                let myChart =this.$echarts.init(this.$refs.myChart)
                let option = { //设置饼状图中心文字
                    title:{
                        text: Math.round(this.object.num2 / this.object.num1 * 100) + "%",
                        x:'center',
                        y:'center'
                    }, 

                    grid:{
                        top:'0px',
                        right:'0px', 
                        bottom:'0px' , 
                        left:'0px'
                   },         
                    tooltip: {
                        trigger: 'item',
                        show:false,
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },                
                    label: {
                        show: false,  //隐藏label
                        position: 'center' 
                    }, 
                    color:['#F2F4F6', this.type  === '1' ? '#FF9900': this.type === '2' ? '#258EDF':'#4ECB73'], //修改默认颜色                
                    labelLine: {
                        show: false
                     }, 
                    series: [
                        {
                            name:'',
                            type: 'pie',
                            radius: ['50%', '70%'],//设置饼状图空心比例
                            label: {
                                show: false,
                                position: 'center'
                            },
                            data: [
                                {value: this.object.num1 - this.object.num2 ,name:'' },
                                {value: this.object.num2,name:''}                          
                            ]
                        }
                    ]
                }
                // 绘制图表
                myChart.setOption(option) 

            })
          },
    }
}
</script>


<style scoped >
  

    .p-num{     
         margin: 10px 0px 0px 30px;
    }

   

    .bfc-parent{
        overflow:hidden
    }


    .bfc-parent span:first-child{
        width:90px;
        display:inline-block;
    }
</style>