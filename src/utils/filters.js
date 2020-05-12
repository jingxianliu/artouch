



export function userTypeFilter(value) {
        switch (value) {
          
                case '1':
                        value = "奥比根用户";
                        break;
                case '2':
                        value = "奥比一级管理员";
                        break;        
                case '3':
                        value = "组织超级管理员";
                        break;   
                case '4':
                        value = "组织普通管理员";
                        break;                        
                } 
        return value
}








