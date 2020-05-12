<template>
    <div name="app-details">  
        <img :src="app.src" v-if="app.type === 'img'"/>
        <video v-else controls="controls" autoplay="autoplay">
            <source :src="app.src" type="video/mp4">
        </video>
        <div class="app-info">
            <p><span>app:</span>{{app.name}}</p>
            <p><span>背景类型:</span>{{app.type}}</p>
            <p v-if="app.type === 'img'"><span>音乐:</span>{{app.music}}</p>
            <p><span>说明:</span>{{app.desc}}</p>
        </div>   
    </div>   
</template>

<script>
export default {
    props:{
        appId:{
            type:String ,
            default:''
        }
    },
    data(){
        return {
            app:{}
        }
    },
    watch:{
        appId: {
            handler: function(val, oldVal){ 
                if(val !== oldVal){
                    this.getAppInfo()
                }            
            },
            // 深度观察监听
            deep: true
        }  
       
    },

    created(){
        this.getAppInfo()
    },
    methods:{
        getAppInfo(){
            if(this.appId === '1'){
                this.app =  {  
                type:'video',
                src:'http://appstoretest.orbbec.me:10091/vod/54e41e07e0369fedb9437f23c25f5c43.mp4',
                name:'大龙教你做菜',             
                music:'恐龙救援队：Dinosaur Rescue Team.mp3',
                desc:'该场景提供一个让用户翻看小恐龙绘本的APP，APP初始界面背景是恐龙荒原，进入界面后播放Dinosaur Rescue Team.mp3。'} 
            }else{
                 this.app =  {    
                    type:'img',
                    src:'http://appstoretest.orbbec.me:10091/img/867c41fb33d047ce0974b41fd47272eb.jpg',
                    name:'大龙教你做菜',             
                    music:'恐龙救援队：Dinosaur Rescue Team.mp3',
                    desc:'该场景提供一个让用户翻看小恐龙绘本的APP，APP初始界面背景是恐龙荒原，进入界面后播放Dinosaur Rescue Team.mp3。'} 
            }
        }
    }
}
</script>

<style scoped>
    img,video{
        width: 100%;
    }
    .app-info{
        margin: 0 20px;
        font-size: 16px;
    }
</style>

