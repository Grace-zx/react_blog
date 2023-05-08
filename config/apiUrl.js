let ipUrl = 'http://127.0.0.1:7001/default/' 

let servicePath = {
    getArticleList:ipUrl + 'getArticleList' ,  //  首页文章列表接口
    getArticleById:ipUrl + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数，要加/
    getTypeInfo:ipUrl + 'getTypeInfo',  // 文章类别
    getListById:ipUrl + 'getListById/',  // 根据类别ID获得文章列表
    getPhotoList:ipUrl + 'getPhotoList/',  // 根据类别ID获得相册列表
    getMessageList:ipUrl + 'getMessageList/',  // 根据类别ID获得留言列表
    getAddMessage:ipUrl + 'getMessageList',//添加留言
    getLinks:ipUrl + 'getLinks',//获取友情链接
    getInformation:ipUrl + 'getInformation',//获取个人信息
}
export default servicePath;