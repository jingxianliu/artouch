import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import( '@/views/Home.vue'),
      redirect:'/home/device',
      meta: {
        title: '首页',
        requireLogin: true
      },
      children:[
        {
          path: '/home/device',
          name: 'device',
          component: () => import('@/views/device/Device.vue'),
          meta: {
            title: '设备管理',
            icon:'el-icon-odometer',
            leftMenu:true,
            type:'all'
          },
          children:[  
            {
              path: '/home/device/edit',
              name: 'edit-device',
              component:  () =>import( '@/views/device/EditDevice.vue'),
              meta: {
                title: '设备详情',
                leftMenu:false
              }
           },
           {
            path: '/home/device/add',
            name: 'add-device',
            component:  () =>import( '@/views/device/EditDevice.vue'),
            meta: {
              title: '添加设备',
              leftMenu:false
            }
         }
          ]
        },      
        {
          path: '/home/content',
          name: 'content',
          component:  () =>import( '@/views/Empty.vue'),
          meta: {
            title: '内容配置',
            icon:'el-icon-menu',
            leftMenu:true,
            type:'3'
          },
          redirect: "/home/content/content-list",
          children:[            
            {
              path: '/home/content/content-list',
              name: 'content-list',
              component:  () =>import( '@/views/content/content/ContentList.vue'),
              meta: {
                title: '内容管理',
                leftMenu:true
              },
              children:[
                {
                  path: '/home/content/add',
                  name: 'add-content',
                  component:  () =>import( '@/views/content/content/ContentEdit.vue'),
                  meta: {
                    title: '新增内容',
                    leftMenu:false
                  },
                } ,
                {
                  path: '/home/content/details',
                  name: 'edit-content',
                  component:  () =>import( '@/views/content/content/ContentEdit.vue'),
                  meta: {
                    title: '内容详情',
                    leftMenu:false
                  },
                } 
              ]
            }     
           ,{
              path: '/home/app',
              name: 'app-list',
              component:  () =>import( '@/views/content/app/AppList.vue'),
              meta: {
                title: 'App管理',
                leftMenu:true
              },
              children:[
                {
                  path: '/home/app/add',
                  name: 'add-app',
                  component:  () =>import( '@/views/content/app/AppEdit.vue'),
                  meta: {
                    title: '新增app',
                    leftMenu:false
                  },
                } ,
                {
                  path: '/home/app/edit',
                  name: 'edit-app',
                  component:  () =>import( '@/views/content/app/AppEdit.vue'),
                  meta: {
                    title: 'app详情',
                    leftMenu:false
                  },
                } 
              ]
            }             
        
          ]
        } ,
        {
          path: '/home/content',
          name: 'content',
          component:  () =>import( '@/views/Empty.vue'),
          meta: {
            title: '内容配置',
            icon:'el-icon-menu',
            leftMenu:true,
            type:'4'
          },
          redirect: "/home/content/content-list",
          children:[            
            {
              path: '/home/content/content-list',

              name: 'content-list',
              component:  () =>import( '@/views/content/content/ContentList.vue'),
              meta: {
                title: '内容管理',
                leftMenu:true
              },
              children:[
                {
                  path: '/home/content/add',
                  name: 'add-content',
                  component:  () =>import( '@/views/content/content/ContentEdit.vue'),
                  meta: {
                    title: '新增内容',
                    leftMenu:false
                  },
                } ,
                {
                  path: '/home/content/details',
                  name: 'edit-content',
                  component:  () =>import( '@/views/content/content/ContentEdit.vue'),
                  meta: {
                    title: '内容详情',
                    leftMenu:false
                  },
                } 
              ]
            }     
           ,{
              path: '/home/app',
              name: 'app-list',
              component:  () =>import( '@/views/content/app/AppList.vue'),
              meta: {
                title: 'App管理',
                leftMenu:true
              },
              children:[
                {
                  path: '/home/app/add',
                  name: 'add-app',
                  component:  () =>import( '@/views/content/app/AppEdit.vue'),
                  meta: {
                    title: '新增app',
                    leftMenu:false
                  },
                } ,
                {
                  path: '/home/app/edit',
                  name: 'edit-app',
                  component:  () =>import( '@/views/content/app/AppEdit.vue'),
                  meta: {
                    title: 'app详情',
                    leftMenu:false
                  },
                } 
              ]
            }             
        
          ]
        } ,
        {
          path: '/home/model',
          name: 'model',
          component:  () =>import( '@/views/Empty.vue'),
          meta: {
            title: '模型管理',
            icon:'el-icon-s-order',
            leftMenu:true,
            type:'all'
          },
          redirect: "/home/model/train-list",
          children:[
               
            {
              path: '/home/model/train-list',
              name: 'train-list',
              component:  () =>import( '@/views/model/train/TrainList.vue'),
              meta: {
                title: '模型训练',
                leftMenu:true
              },
              children:[
                {
                  path: '/home/model/add',
                  name: 'model-add',
                  component:  () =>import( '@/views/Empty.vue'),
                  meta: {
                    title: '创建模型',
                    leftMenu:false
                  },
                } ,
                {
                  path: '/home/model/details',
                  name: 'model-details',
                  component:  () =>import( '@/views/Empty.vue'),
                  meta: {
                    title: '模型详情',
                    leftMenu:false
                  },
                } 
              ]
            }     
            ,{
              path: '/home/result/result-list',
              name: 'result-list',
              component:  () =>import( '@/views/model/result/Result.vue'),
              meta: {
                title: '识别结果审核',
                leftMenu:true
              },
              children:[
                {
                  path: '/home/result/details',
                  name: 'result-details',
                  component:  () =>import( '@/views/Empty.vue'),
                  meta: {
                    title: '设备详情',
                    leftMenu:false
                  },
                } 
              ]
            }             
        
          ]
        } ,
        {
          path: '/home/account',
          name: 'account',
          component:  () =>import( '@/views/Empty.vue'),
          meta: {
            title: '账户管理',
            icon:'el-icon-postcard',
            leftMenu:true,
            type:'1'
          },
          redirect: "/home/group/group-list",
          children:[
               
            {
              path: '/home/group/group-list',
              name: 'group-list',
              component:  () =>import( '@/views/account/GroupList'),
              meta: {
                title: '组织列表',
                leftMenu:true
              },
              children:[
                {
                  path: '/home/group/add',
                  name: 'group-add',
                  component:  () =>import( '@/views/account/AddAccount.vue'),
                  meta: {
                    title: '新建组织',
                    leftMenu:false
                  },
                } ,
                {
                  path: '/home/group/details',
                  name: 'group-details',
                  component:  () =>import( '@/views/account/GroupDetails.vue'),
                  meta: {
                    title: '组织详情',
                    leftMenu:false
                  },
                } 
              ]
            }     
            ,{
              path: '/home/admin/admin-list',
              name: 'admin-list',
              component:  () =>import( '@/views/account/AdminList.vue'),
              meta: {
                title: '管理员列表',
                leftMenu:true
              },
              children:[
                {
                  path: '/home/admin/admin-details',
                  name: 'admin-details',
                  component:  () =>import( '@/views/account/AdminDetails.vue'),
                  meta: {
                    title: '账户详情',
                    leftMenu:false
                  },
                } ,
                {
                  path: '/home/admin/add',
                  name: 'admin-add',
                  component:  () =>import( '@/views/account/AddAccount.vue'),
                  meta: {
                    title: '添加管理员',
                    leftMenu:false
                  },
                } 
              ]
            }             
        
          ]
        } ,
        {
          path: '/home/account/account-list',
          name: 'account-list',
          component: () => import( '@/views/account/AdminList.vue'),
          meta: {
            title: '账户管理',
            icon:'el-icon-postcard',
            leftMenu:true,
            type:'3'
          },
          children:[
            {
              path: '/home/admin/admin-details',
              name: 'account-details',
              component:  () =>import( '@/views/account/AdminDetails.vue'),
              meta: {
                title: '账户详情',
                leftMenu:false
              },
            } ,
            {
              path: '/home/account/add',
              name: 'account-add',
              component:  () =>import( '@/views/account/AddAccount.vue'),
              meta: {
                title: '添加管理员',
                leftMenu:false
              },
            } 
          ]
        },
        {
          path: '/user-info',
          name: 'user-info',
          component: () => import( '@/views/userInfo/UserInfo.vue'),
          meta: {
            title: '个人账户',
            icon:'el-icon-user',
            leftMenu:true,
            type:'all'
          }
        },
                   
      ]
    
    }, 
    {
      path: '/',
      name: 'home',
      component: () => import( '@/views/Home.vue')
    },
    // {
    //   path: '/',
    //   name: 'login',
    //   component: () => import( '@/views/Login.vue')
    // }
  ]
  

 
})


