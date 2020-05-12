<template>
    <div name="device" >     
        <div v-if="!openRouter">
            <div class="item-box">
                <div class="item">
                    <category :xAxisData="xAxisData" :valueData="valueData" :userType="userType"></category> 
                </div>
                 <div class="item">
                    <bar v-if="userType === '1'" :xAxisData="xAxisData" :valueData="valueData" num="59"></bar> 
                    <pie v-else :object="obeject1"  type="1" ></pie> 
                </div>
                 <div class="item">
                    <pie  :object="obeject2"  type="2" ></pie>
                </div>
                 <div class="item">
                     <pie  :object="obeject3"  type="3" ></pie>
                </div>
            </div>    
                          
            <deviceList :userType="userType"></deviceList>
        </div>
        <router-view v-else /> 
    </div>
</template>

<script>
import pie from './Pie'
import category from './Category'
import bar from './Bar'
import deviceList from './DeviceList'
import {mapState} from 'vuex'
export default {
    components:{pie,category,bar,deviceList},
    data() {
        return { 
            openRouter:false ,    
            obeject1:{num1:59,num2:13},
            obeject2:{num1:12,num2:4},
            obeject3:{num1:20,num2:12},      
            xAxisData:['2020-03-28','2020-03-29','2020-03-30','2020-03-31','2020-04-01','2020-04-02','2020-04-03','2020-04-05','2020-04-06','2020-04-06'],
            valueData:[220, 912, 901, 534, 990, 330, 720,500,200,100]
        }
      },
     watch: {
        $route:function(){
            this.openRouter = !this.openRouter                 
        }
    },
     computed:{
      ...mapState({ 
          userType:state=>state.userType ,
        }),        
    },

    created(){
         this.init()
            
    },
    mounted(){
    },
    methods:{

        init(){
            
        }
        
        
    }

}
</script>


<style scoped>
 

   .item-box{
       display: flex;
       flex-wrap: wrap;

   }

    .item{
        width: 380px;
        padding: 10px ;

    }

</style>