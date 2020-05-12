
import Submenu from './Submenu'
import Breadcrumb from './Breadcrumb'
import Pagination from './Pagination'
import CopyBtn from './CopyBtn'
import UploadPhoto from '../views/userInfo/UploadPhoto'
import pickPicToTrain from '../views/model/train/PickToTrain'
import PickToOptimize from '../views/model/train/PickToOptimize'



function plugin(Vue){

    if(plugin.installed){
        return 
    }
    
    Vue.component('Pagination',Pagination)
    Vue.component('Submenu',Submenu)
    Vue.component('Breadcrumb',Breadcrumb)
    Vue.component('CopyBtn',CopyBtn)
    Vue.component('UploadPhoto',UploadPhoto)
    Vue.component('pickPicToTrain',pickPicToTrain)
    Vue.component('PickToOptimize',PickToOptimize)

}

export default plugin