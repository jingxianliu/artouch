<template>
    <el-card>
        <div>    
            <div>
                <div ref="myChart" :style="{width: '100%', height: '150px'}"></div>
            </div>
            <div class="flex-between-center">
                <div class="flex">
                    <div class="circle">
                        <span class="inline-block-text width-150">待训练模型任务</span>
                    </div>     
                    <span class="font-size-24">{{num}}</span>   
                </div>                             
                <el-button type="primary" size="small" @click="goToTrainList">处理</el-button>
            </div>
        </div> 
    </el-card>           
</template>

<script>
export default {
    props:{      
        xAxisData:{
            type:Array ,
            default:() => []
        },
        valueData:{
            type:Array ,
            default:() => []
        },
        num:{
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
               let  option = {
                   grid:{
                        top:'10px',
                        right:'10px', 
                        bottom:'30px' , 
                        left:'40px'
                   },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        },
                        text:""
                    },
                    color:'#FF9D3A',
                    xAxis: {
                        type: 'category',
                        data: this.xAxisData,
                        show:true,  

                    },
                    yAxis: {
                        type: 'value',
                        show:true, 
                    },
                    series: [{
                        data: this.valueData,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(220, 220, 220, 0.8)'
                        }
                    }]
                };
                myChart.setOption(option) 

            })
          },

          goToTrainList(){
            this.$router.push({ name: 'train-list'})

          }
    }
}
</script>


<style scoped >

.circle:before{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #FF9D3A;
    position: absolute;
    content:''
}
   

</style>