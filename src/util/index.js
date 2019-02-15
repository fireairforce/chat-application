// 一个工具函数，用于路由的动态跳转

export function getRedirectPath({type,avatar}){
    // 根据用户的信息，返回之后跳转的地址
    // user.type  /boss  /genius
    // user.avatar  /bossinfo /geniusinfo
    let url = (type==='boss')?'/boss':'/genius' 
    if(!avatar){
        url += 'info'
    }
    return url
}