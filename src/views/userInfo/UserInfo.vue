<template>
    <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="个人信息" name="personal_info">
            <personalInfo :userInfo="userInfo"></personalInfo>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="update_pwd">
            <updatePwd  ref="updatePwd"  :email="userInfo.email"></updatePwd>
        </el-tab-pane>     
        <el-tab-pane label="修改邮箱" name="update_email">
            <updateEmail ref="updateEmail" :email="userInfo.email"></updateEmail>
        </el-tab-pane>   
    </el-tabs>
</template>
<script>
import personalInfo from './Personalnfo'
import updatePwd from './updatePwd'
import updateEmail from './updateEmail'
import {mapGetters} from 'vuex'

export default {
    components:{personalInfo,updatePwd,updateEmail},
    data(){
        return{
            activeName:'personal_info',
            userInfo:{}
        }
    },
    watch: {
        $route: {
            handler: function(){               
                if(this.$route.query.type){
                  this.activeName = this.$route.query.type
                }
            },
            // 深度观察监听
            deep: true
        }  
    },
    created(){
        this.getUserInfo()
    },
    
    methods:{
        ...mapGetters([
            'getLoginName'
        ]),
        handleClick(obj){
            if(obj.name === 'update_pwd'){
                this.$refs.updatePwd.init()
            }else if(obj.name === 'update_email'){
                this.$refs.updateEmail.init()
            }
        },

        //获取用户信息
        getUserInfo(){
            //  this.$API.getUserById(this.userId).then((res) => {
            //    if(res.data.errorcode === 1){
            //     this.tableData = res.data.data.data_list
            //     this.total = res.data.data.num_results
            //    }
            // })
          this.userInfo = {
            group: '学步思教育有限公司',
            username: this.getLoginName(),
            email: '123@qq.com',
            type:'1',
            img:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      },
    }
}
</script>


<style scoped>
    .el-form{
        width: 500px;
        text-align: left;
    }
</style>
