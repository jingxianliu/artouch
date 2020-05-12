import { get, post ,put ,deletes,upload} from './axios'

const baseUrl = process.env.API

 // 登录
export const login = (data) => {
  return post(`${baseUrl}/login`, data)
}

//退出登陆
export const logout = (data) => {
  console.log(baseUrl)
  return post(`${baseUrl}/logout`, data)
}


/******************* 用户管理 start *******************/

//新增
export const addUser = (data) => {
 
  return post(`${baseUrl}/add_user`, data)
}

//删除
export const deleteUser= (userId) => {
  
  return deletes(`${baseUrl}/users?`,{"id":userId})
}



//查询列表
export const getUserList= (currentPage = 1,pageSize = 10,userName = "") => {
  return get(`${baseUrl}/userlist?page=${currentPage}&item=${pageSize}&name=${userName}`)
}


//查询用户详情
export const getUserById= (userId) => {
  return get(`${baseUrl}/users?id=${userId}`)
}


//重置密码

export const resetPwd= () => {
  return put(`${baseUrl}/reset_password`)
}

//修改密码
export const updatePwd= () => {
  return put(`${baseUrl}/change_password`)
}

//修改邮箱
export const updateEmail= () => {
  return put(`${baseUrl}/change_email`)
}

//修改用户名
export const updateUserName= () => {
  return put(`${baseUrl}/change_username`)
}

//获取验证码
export const getValidCode= () => {
  return get(`${baseUrl}/validcode`)
}

/******************* 用户管理 end *******************/




/*************************组织管理 start ****************/
//新增
export const addGroup = (data) => {
 
  return post(`${baseUrl}/add_org`, data)
}

//删除
export const deleteGroup = (groupId) => {
  
  return deletes(`${baseUrl}/orgs?`,{"id":groupId})
}



//查询列表
export const getGroupList= (currentPage = 1,pageSize = 10,groupName = "") => {
  return get(`${baseUrl}/org_list?page=${currentPage}&item=${pageSize}&name=${groupName}`)
}


//查询详情
export const getGroupById= (groupId) => {
  return get(`${baseUrl}/orgs?id=${groupId}`)
}


//重置密码
export const updateGroupPwd= () => {
  return put(`${baseUrl}/change_password`)
}


/*************************组织管理 end ****************/

// 上传
export const uploadFile = (data) => {
  return upload(`http://117.48.209.47:8081/api/obs/upload`, data)
 // return upload(`${baseUrl}/upload`, data)
}




