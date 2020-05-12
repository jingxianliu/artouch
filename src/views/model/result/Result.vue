<template>
    <div>
        <div class="flex">
            <div :class="['circle', 'circle-3',activeName === 'high' ? 'active':'']"><span @click="activeName = 'high'" >高可信度 ({{high}})</span></div>
            <el-divider direction="vertical"></el-divider>
            <div :class="['circle', 'circle-4',activeName === 'low' ? 'active':'']"><span @click="activeName = 'low'" >低可信度 ({{low}})</span></div>
        </div>
        <div>
            <HighConfidence v-if="activeName === 'high'"></HighConfidence>
            <LowConfidence v-if="activeName === 'low'" @dealPictureSuccess="low = low - 1"></LowConfidence>
        </div>
    </div>
  <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="高可信度" name="high">
        <HighConfidence></HighConfidence>
    </el-tab-pane>
    <el-tab-pane label="低可信度" name="low">
        <LowConfidence></LowConfidence>
    </el-tab-pane>
  </el-tabs> -->
</template>
<script>
import HighConfidence from './HighConfidence'
import LowConfidence from './LowConfidence'

  export default {
    components:{HighConfidence,LowConfidence},
    data() {
      return {
        activeName: 'high',
        high:18,
        low:12
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style scoped>
 .active{
    border-bottom: 2px solid #409EFF;
    padding-bottom: 5px;
 }
 .active span{
     color: #409EFF;
 }
</style>