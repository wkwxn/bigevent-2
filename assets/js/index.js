/*
 * @Author: your name
 * @Date: 2021-01-05 18:19:25
 * @LastEditTime: 2021-01-06 16:48:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigevent\assets\js\index.js
 */

  let  layer = layui.layer; 
  getUserInfo()
//   获取头像，昵称
function getUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        success:function(res){
            // console.log(res.data);

            if (res.status !==0) {
                return layer.msg('获取信息失败！')
            }
            setUserInfo(res.data)
        }
    })
}

function setUserInfo(data){

    let name=data.nickname||data.username
    
    let username=data.username[0].toUpperCase()
    // console.log(username);
    // 设置头像，用户名
   
    $('.welcome').text('欢迎'+' '+name)
    // 如果有设置头像的时候
    if (data.user_pic) {
        $('.layui-nav-img').attr('src',data.user_pic).show()
        $('.trxt-avatar').hide()

    }else{
        $('.layui-nav-img').hide()
        $('.trxt-avatar').text(username).show()
    }
    
}

//   实现退出功能
$('.layui-tuichu').on('click',function(){
    layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
        //do something
        // 点击退出，做的事与登录相反
        // 1.返回登录页面
        // 2.清空身份认证信息：token
        location.href='/home/login.html'

        // 2.
        localStorage.removeItem('token')
        layer.close(index);
      });   
        
})