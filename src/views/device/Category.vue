<template>
    <el-card>
        <div>
            <div>
                <div class="font-size-18">活跃设备数</div>
                <div class="margin-top-10">
                    <span class="inline-block-text width-150">当前活跃设备数</span>
                    <span class="font-size-18">8</span>
                </div>
            </div>
            <div>
                <div ref="myChart" :style="{width: '100%', height: '100px'}"></div>
            </div>
            <div class="flex-between">
                <div>
                    <span class="inline-block-text width-100 font-size-18">设备总数</span>
                    <span class="font-size-24">260</span>
                </div>
                <div v-if="userType === '1' || userType === '2'">
                    <span class="inline-block-text width-100 font-size-18">组织总数</span>
                    <span class="font-size-24">36</span>
                </div>
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
        userType:{
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
               let option = {
                    grid:{
                        top:'10px',
                        right:'10px', 
                        bottom:'10px' , 
                        left:'10px'
                   },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    color:'#975FE4',//修改默认颜色
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.xAxisData,
                        show:false,   //取消X轴坐标刻度
                    },
                    yAxis: {
                        type: 'value',
                        show:false,   //取消Y轴坐标刻度            
                    },
                    series: [{
                        data: this.valueData,
                        type: 'line',
                        areaStyle: {},
                        smooth: true, //改为曲线                   
                    }]
                };
                myChart.setOption(option) 

            })
          },
    }
}
</script>


<style scoped >
 
 
</style>