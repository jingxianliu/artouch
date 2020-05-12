export  default{
    pushPending (state, params) {    //增加要取消的请求
        state.cancelTokenArr.push(params)
    },
    deletePending (state, config = {}) {//删除要取消的请求
        if(Object.keys(config).length > 0){       
            let pending = state.cancelTokenArr.find((item) => item.u === config.url + '&' + config.method )
            if(pending && pending.f){
                pending.f() //执行取消操作
                state.cancelTokenArr =  state.cancelTokenArr.filter((item) => item.u !== config.url + '&' + config.method) //把这条请求移除
            }
        }else{
            //跳转路由，取消所有请求
            state.cancelTokenArr.forEach(e => { e && e.f && e.f() });
            state.cancelTokenArr = []
        }
    },
   
    setLoginName(state,value){  
        state.loginName = value
    },
    setUserType(state,value){  
        state.userType = value
    },
    setGroupName(state,value){  
        state.groupName = value
    },
    setTOKEN(state,token){  
        state.TOKEN = token
    }
}